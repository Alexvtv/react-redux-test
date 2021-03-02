import Nav from '../components/navigation'
import { useState } from 'react'
import { connect } from "react-redux"

import SearchPanel from '../components/searchPanel'

import TaskList from '../components/taskList'
import TaskView from '../components/taskView'
import TaskCreateDisplay from '../components/taskCreateDisplay'

import '../styles/tasks.scss'

function TasksPage(props) {

  const [selectedId, setSelectedId] = useState(null) 
  // Переменная selectedId. Принимает значения:
  // null - id отсутствует -> просмотр списка заявок
  // id - -> просмотр/редактирование конкретной заявки
  // 'new' - -> создание новой заявки

  const selectTask = (value) => {
    setSelectedId(value)
  }

  const taskAction = () => {
    if(selectedId === null) {
      return
    }
    if(selectedId === 'new') {
      return <TaskCreateDisplay selectTask={selectTask} />
    } else {
      return <TaskView selectedId={selectedId} selectTask={selectTask} />
    }
  }

  return (
    <div className='commonPage'>
      <Nav />
      <div className='main tasks-page row'>
        <SearchPanel />
      	<div className={selectedId === null ? 'tasks-list col-12' : 'tasks-list col-12 col-md-5 col-xl-6'}>
          <button onClick={() => setSelectedId('new')} className='standart-button'>
            Создать заявку
          </button>
          <TaskList selectTask={selectTask} />
      	</div>
        { taskAction() }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { data: state }
};

export default connect(mapStateToProps, null)(TasksPage)
