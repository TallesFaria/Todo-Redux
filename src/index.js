import React from 'react';
import Root from  './components/Root'
import configureStore from './configureStore'
import { render } from 'react-dom'
import { fetchTodos } from './api'

fecthTodos('all').then(todos => console.log(todos))

const store = configureStore()

render(
  <Root store={store}/>,
  document.getElementById('root')
)

