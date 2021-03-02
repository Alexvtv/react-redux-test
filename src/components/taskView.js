import { useState, useEffect } from 'react'
import { connect } from "react-redux"

import { loadTasks } from "../redux/actions"

import '../styles/actionTaskDisplay.scss'

function TaskView(props) {

	const [comment, setComment] = useState('') 
	const [currentTask, setCurrentTask] = useState(props.data.tasks.find(task => task.id === props.selectedId))
	
	useEffect(() => {
		fetch(`http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Tasks/${props.selectedId}`)
  		.then((response) => {
  		  return response.json()
  		})
  		.then((data) => {
  		  setCurrentTask(data)
  		})
	}, [props.selectedId])


	const sendChanges = async (type, value) => {

		let body = {
			id: currentTask.id,
			statusId: currentTask.statusId,
			executorId: currentTask.executorId
		}

		if(type === 'lifetimeItems') {
  		body.comment = value
  		setComment('')
		} else if(type === 'statusId') {
  		body.statusId = value
  	} else if(type === 'executorId') {
  		body.executorId = value
  	}

		let res = await fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Tasks', {
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(body)
		})

		if(!!res.ok) {
			fetch(`http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Tasks/${props.selectedId}`)
  			.then((response) => {
  			  return response.json()
  			})
  			.then((data) => {
  			  setCurrentTask(data)
  			  let modifiedArr = [...props.data.tasks]
  			  modifiedArr.find(task => task.id === props.selectedId).statusId = data.statusId
  			  modifiedArr.find(task => task.id === props.selectedId).executorId = data.executorId
  			  props.dispatch(loadTasks(modifiedArr))
  			})


		} else {
			console.log(res.statusText)
		}
	}

	const comments = () => {

		if(currentTask.lifetimeItems !== undefined) {
			return currentTask.lifetimeItems.filter(item => item.lifetimeType !== 30).map(comment => {

				let date = new Date(comment.createdAt)
				let month = date.toLocaleString("ru", {month: 'long'})
				let dateResult = `${date.getUTCDate()} ${month}, ${('0' + String(date.getHours())).slice(-2)}:${('0' + String(date.getMinutes())).slice(-2)} прокомменировал`

				return (
					<div className='comment' key={comment.id}>
						<div>
							<div className='comment-avatar'>
							</div>
							<div className='comment-data'>
								<p className='comment-name'>{ props.data.users[0].name}</p>
								<p className='comment-date'>{ dateResult }</p>
							</div>
						</div>
						<p className='comment-content'>{ comment.comment }</p>
					</div>
				)
			})
		}
	}

	const displayDate = () => {

		let date = new Date(currentTask.createdAt)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let dt = date.getDate()
		
		if (dt < 10) {
		  dt = '0' + dt
		}
		if (month < 10) {
		  month = '0' + month
		}

		return (
			<p><img src='/icons/calendar.png' /> {`${year}.${month}.${dt} `}</p>
		)
	}

	const displayOptions = (type) => {
		return props.data[type].map(elem => {
      return(
      	<option value={elem.id} key={elem.id}>{ elem.name }</option>
      )
    }) 
	}

  return (
    <div className='action-task-menu action-task-menu-view col-12 col-md-7 col-xl-6'>
      <div className='action-task-menu-title'>
      	<p className='title-id'>№ { currentTask.id }</p>
      	<p className='title-name'>{ currentTask.name }</p>
      	<img src='/icons/close.png' onClick={() => props.selectTask(null)} />
      </div>
      <div className='col-12'>
      	<div className='task-menu-side'>
      		<div className='side-status'>
      			<div style={{background: currentTask.statusRgb}}></div>
      			<select value={currentTask.statusId} onChange={(event) => sendChanges('statusId', event.target.value)}>
      				{ displayOptions('statuses') }
      			</select>
      		</div>
      		<div className='side-initiator'>
      			<p className='clarification'>Создана</p>
      			<p>{ currentTask.initiatorName }</p>
      		</div>
      		<div className='side-executor'>
      			<p className='clarification'>Исполнитель</p>
      			<select value={currentTask.executorId} onChange={(event) => sendChanges('executorId', event.target.value)}>
      				{ displayOptions('users') }
      			</select>
      		</div>
      		<div className='side-priority'>
      			<p className='clarification'>Приоритет</p>
      			<p>{ currentTask.priorityName }</p>
      		</div>
      		<div className='side-date'>
      			<p className='clarification'>Срок</p>
      			{ displayDate() }
      		</div>
      		<div className='side-tags'>
      			<p className='clarification'>Теги</p>
      			{ currentTask.tags.map(tag => {
      				return <p className='side-tag' key={tag.id}>{tag.name}</p>
      			})}
      		</div>
      	</div>
      	<div className='task-menu-main'>
      		<div className='task-menu-description'>
      			<p className='clarification'>Описание</p>
            <span dangerouslySetInnerHTML={{__html: currentTask.description }} />
      		</div>
      		<div className='create-comment'>
      			<p className='clarification'>добавление комментариев</p>
      			<p><textarea value={comment} onChange={(event) => setComment(event.target.value)} /></p>
      			<button className='standart-button' onClick={() => sendChanges('lifetimeItems', comment)}>Сохранить</button>
      		</div>
      			{ comments() }
      	</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { data: state }
}

export default connect(mapStateToProps, null)(TaskView)
