import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/common.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

import rootReducer from "./redux/reducers"

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    	<Provider store={store}>
      	<App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

