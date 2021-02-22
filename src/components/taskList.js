import { connect } from "react-redux"

const TaskList = (props) => {

  const taskStatus = (id) => {
    const status = props.data.statuses.find(elem => elem.id === id)
    return (
      <div className='col-1 task-status'><p style={{ backgroundColor: status.rgb }}>{ status.name }</p></div>
    )
  }

  const tasks = props.data.tasks.map(task => {

    const priority = props.data.priorities.find(elem => elem.id === task.priorityId)

    return (
      <div className='col-12 task-unit' key={ task.id } onClick={() => props.selectTask(task.id)}>
        <div className='row task-unit-wrapped'>
          <div className='col-1 task-id'><div style={{backgroundColor: priority.rgb}}></div><p>{ task.id }</p></div>
          <div className='col-4'><p>{ task.name }</p></div>
          { taskStatus(task.statusId) }
          <div className='col-2'><p>{ task.executorName }</p></div>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className='tasks-list-params col-12'>
        <div className='row task-unit-wrapped'>
          <div className='col-1 task-param-id'><p>ID</p></div>
          <div className='col-4'><p>Название</p></div>
          <div className='col-1'><p>Статус</p></div>
          <div className='col-2'><p>Исполнитель</p></div>
        </div>
      </div>
      { tasks }
    </div>
  )
}

const mapStateToProps = state => {
  return { data: state }
}

export default connect(mapStateToProps, null)(TaskList)
