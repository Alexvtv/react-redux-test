import { useState } from 'react'
import { connect } from "react-redux"
import { loadTasks } from "../redux/actions"

import '../styles/actionTaskDisplay.scss'

function TaskCreateDisplay(props) {

	const [taskName, setTaskName] = useState('')
	const [taskDescription, setTaskDescription] = useState('')

	const createTask = async () => {

		let date = new Date().toISOString()

		let body = {
			name: taskName,
			description: taskDescription,
      comment: "string",
			price: 0,
  		taskTypeId: 0,
  		statusId: 0,
  		priorityId: 0,
  		serviceId: 0,
  		resolutionDatePlan: date,
  		initiatorId: 0,
  		executorId: 0,
  		executorGroupId: 0
		}

		let res = await fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Tasks', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(body)
		})
    
    if(res.ok) {  
      res = await res.json()

      // Обновляем данные заявок, после чего переходим на созданную заявку

      fetch('http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=6581f395-5d65-4960-84f2-2ce6cd6dda13')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        props.dispatch(loadTasks(data.value))
      })
      .then(() => {
        props.selectTask(res)
      })
    }

	}
	
  return (
    <div className='action-task-menu create-task'>
      <div className='action-task-menu-title'>
      	<p className='title-name'>Новая заявка</p>
      	<img src='/icons/close.png' onClick={() => props.selectTask(null)} />
      </div>
      <div className='col-12 task-menu-main'>
      	<div className='new-task-content'>
      		<p className='clarification'>Название</p>
      		<textarea value={taskName} onChange={(event) => setTaskName(event.target.value)} />
      	</div>
      	<div className='new-task-content new-task-description'>
      		<p className='clarification'>Описание</p>
      		<textarea value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} />
      	</div>
      	<button className='standart-button' onClick={createTask}>Сохранить</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { data: state }
}

export default connect(mapStateToProps, null)(TaskCreateDisplay)
