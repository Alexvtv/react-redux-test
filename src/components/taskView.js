import { useState, useEffect } from 'react'
import { connect } from "react-redux"

import '../styles/actionTaskDisplay.scss'

function TaskView(props) {

	const currentTask = props.data.tasks.find(task => task.id === props.selectedId)

  const [changes, setChanges] = useState( {statusId: false, executorId: false, comment: ''} ) 

	const createChanges = (type, value) => {

		const changesCopy = {...changes}
		type === 'comment' ? changesCopy[type] = value : changesCopy[type] = Number(value)
		setChanges(changesCopy)

	}

	const sendChanges = async () => {

		let body = {}

		body.id = currentTask.id

		// Проверяем изменения в объекте changes

		if(changes.statusId !== false) {

			let newStatus = props.data.statuses.find(status => status.id === changes.statusId)
			let {id, name, rgb} = newStatus

			body.statusId = id
			body.statusName = name
			body.statusRgb = rgb

		} else {

			let {statusId, statusName, statusRgb} = currentTask
			
			body.statusId = statusId
			body.statusName = statusName
			body.statusRgb = statusRgb

		}

		if(changes.executorId !== false) {

			let newExecutor = props.data.users.find(user => user.id === changes.executorId)
			let {id, name} = newExecutor

			body.executorId = id
			body.executorName = name

		} else {

			let {executorId, executorName} = currentTask
			
			body.executorId = executorId
			body.executorName = executorName

		}

		if (changes.comment.length > 0) {
			body.comment = changes.comment
		}

		let res = await fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Tasks', {
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(body)
		})

		if(!!res.ok) {
			setTimeout(() => window.location.reload())
		} else {
			console.log(res.statusText)
		}
	}

	const comment = () => {

		if((currentTask.comment !== undefined) && (currentTask.comment.length > 0)) {
			return (
				<div className='comment'>
					<div>
						<div className='comment-avatar'>
						</div>
						<div className='comment-data'>
							<p className='comment-name'>name surname</p>
							<p className='comment-date'>date</p>
						</div>
					</div>
					<p className='comment-content'>{ '123' }</p>
				</div>
			)
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
    <div className='action-task-menu action-task-menu-view'>
      <div className='action-task-menu-title'>
      	<p className='title-id'>№ { currentTask.id }</p>
      	<p className='title-name'>{ currentTask.name }</p>
      	<img src='/icons/close.png' onClick={() => props.selectTask(null)} />
      </div>
      <div className='row col-12'>
      	<div className='col-12 col-md-8 col-lg-9 task-menu-main'>
      		<div className='task-menu-description'>
      			<p className='clarification'>Описание</p>
            <span dangerouslySetInnerHTML={{__html: currentTask.description }} />
      		</div>
      		<div className='create-comment'>
      			<p className='clarification'>добавление комментариев</p>
      			<p><textarea value={changes.comment} onChange={(event) => createChanges('comment', event.target.value)} /></p>
      			<button className='standart-button' onClick={sendChanges}>Сохранить</button>
      		</div>
      		{ comment() }
      	</div>
      	<div className='col-12 col-md-4 col-lg-3 task-menu-side'>
      		<div className='side-status'>
      			<div style={{background: currentTask.statusRgb}}></div>
      			<select value={changes.statusId || currentTask.statusId} onChange={(event) => createChanges('statusId', event.target.value)}>
      				{ displayOptions('statuses') }
      			</select>
      		</div>
      		<div className='side-initiator'>
      			<p className='clarification'>Создана</p>
      			<p>{ currentTask.initiatorName }</p>
      		</div>
      		<div className='side-executor'>
      			<p className='clarification'>Исполнитель</p>
      			<select value={changes.executorId || currentTask.executorId} onChange={(event) => createChanges('executorId', event.target.value)}>
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
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { data: state }
}

export default connect(mapStateToProps, null)(TaskView)
