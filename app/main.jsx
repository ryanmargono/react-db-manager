'use strict'
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store'
import Home from './components/Home'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div id='view'>
        <Home/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('main')
)