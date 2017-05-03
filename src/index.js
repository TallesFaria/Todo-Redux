import React from 'react';
import Root from  './components/Root'
import configureStore from './configureStore'
import { render } from 'react-dom'

const store = configureStore()

render(
  <Root store={store}/>,
  document.getElementById('root')
)

