import { connect } from "react-redux"

const TaskList = (props) => {

  const taskStatus = (id) => {
    const status = props.data.statuses.find(elem => elem.id === id)
    return (
      <div className='col-2 task-status'><p style={{ backgroundColor: status.rgb }}>{ status.name }</p></div>
    )
  }

  const tasks = props.data.tasks.map(task => {

    const status = props.data.statuses.find(elem => elem.id === task.statusId)
    const executor = props.data.users.find(elem => elem.id === task.executorId)

    return (
      <div className='col-12 task-unit' key={ task.id } onClick={() => props.selectTask(task.id)}>
        <div className='row task-unit-wrapped'>
          <div className='col-2 task-id'><div style={{backgroundColor: status.rgb}}></div><p>{ task.id }</p></div>
          <div className='col-5'><p>{ task.name }</p></div>
          { taskStatus(task.statusId) }
          <div className='col-3'><p>{ executor.name }</p></div>
          <hr className='col-12' />
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className='tasks-list-params col-12'>
        <div className='row task-unit-wrapped'>
          <div className='col-2 task-param-id'><p>ID</p></div>
          <div className='col-5'><p>Название</p></div>
          <div className='col-2'><p>Статус</p></div>
          <div className='col-3'><p>Исполнитель</p></div>
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
