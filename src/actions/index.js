import { normalize } from 'normalizr'
import * as schema from './schema'
import { getIsFetching } from '../reducers'
import * as api from '../api'

export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  })

  return api.fetchTodos(filter).then(response =>
    {
      dispatch({
        type: 'FETCH_TODOS_SUCESS',
        filter,
        response: normalize(response, schema.arryOfTodos)
      })
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong!'
      })
    }
  )
}

export const addTodo = (text) => (dispatch) => 
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCESS',
      response: normalize(response, schema.todo)
    })
  })

export const setVisibilityFilter= (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => (dispatch) => 
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCESS',
      response: normalize(response, schema.todo)
    })
  })


  

