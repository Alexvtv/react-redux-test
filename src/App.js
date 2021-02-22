import Nav from './components/navigation'
import { Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import { connect } from "react-redux"
import { saveData } from "./redux/actions"

import HomePage from './pages/HomePage'
import KnowledgePage from './pages/KnowledgePage'
import TasksPage from './pages/TasksPage'
import EmployeesPage from './pages/EmployeesPage'
import ClientsPage from './pages/ClientsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'

function App({ dispatch }) {

  const [data, setData] = useState(null)

  useEffect(() => {

    Promise.all([
      fetch('http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=6581f395-5d65-4960-84f2-2ce6cd6dda13'),
      fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Priorities'),
      fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Statuses'),
      fetch('http://intravision-task.test01.intravision.ru/api/6581f395-5d65-4960-84f2-2ce6cd6dda13/Users')
    ]).then(async ([tasks, priorities, statuses, users]) => {

      let dataArr = []
      dataArr.tasks = await tasks.json()
      dataArr.tasks = dataArr.tasks.value
      dataArr.priorities = await priorities.json()
      dataArr.statuses = await statuses.json()
      dataArr.users = await users.json()

      dispatch(saveData(dataArr))

    }).catch((err) => {
      console.log(err)
    })

  }, [])

  return (
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/knowledge' component={KnowledgePage}/>
      <Route path='/tasks' component={TasksPage}/>
      <Route path='/employees' component={EmployeesPage}/>
      <Route path='/clients' component={ClientsPage}/>
      <Route path='/analytics' component={AnalyticsPage}/>
      <Route path='/settings' component={SettingsPage}/>
    </Switch>
  )
}

export default connect()(App)
