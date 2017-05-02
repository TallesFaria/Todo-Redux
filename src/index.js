import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';

import { createStore, combineReducers } from 'redux'

const Footer = ({visibilityFilter, onFilterClick}) => (
  <p>
    Show: {' '}  
    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}> All </FilterLink> 
    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}> Active </FilterLink>
    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}> Completed </FilterLink>
  </p>
)

const FilterLink = ({filter, currentFilter, children, onClick}) => {
  if(filter === currentFilter){
    return <span>{children}</span> 
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault() 
      onClick(filter)
    }}>
      {children} 
    </a> 
  )
}

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }   
        case 'TOGGLE_TODO':
            if(state.id !== action.id) {
                return state
            }
            return {
                ...state, 
                completed: !state.completed
            }       
        default:
            return state
    }
}


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
                
            ]
        case 'TOGGLE_TODO':
            return state.map((t) => todo(t, action))      
        default:
            return state
    }
}

const visibilityFilter = (state = 'SHOW_ALL',action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

/* const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(nextState, key) => {
            nextState[Key] = reducers[key](state[key], action)
            return nextState
        },
        {}
    )
}*/ 

const todoApp = combineReducers({ todos, visibilityFilter})

const store = createStore(todoApp)

const AddTodo = ({onAddClick}) => {
  let input;
  return (
    <div>
      <input ref={node => {input = node}}/>
      <button onClick={() => {
          onAddClick(input.value)
          input.value=''
      }}
      >
          AddTodo
      </button>
    </div>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    default:
      break;
  }
}

const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}> {text} </li>
)

const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>)}
  </ul>
)

let nextTodoId = 0
const TodoApp = ({ todos, visibilityFilter}) => (
  <div>
      <AddTodo onAddClick={text => store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }/> 
      <TodoList 
        todos={
          getVisibleTodos(todos, visibilityFilter)} 
          onTodoClick={(id) => {
            store.dispatch({type: 'TOGGLE_TODO', id})
          }
        } 
      />
      <Footer 
        visibilityFilter={visibilityFilter}
        onFilterClick={ filter => 
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      />
  </div>
)


const render = () => {
    ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'))
}

store.subscribe(render)
render()

// ReactDOM.render(
//   <TodoApp {store.getState().todos} />,
//   document.getElementById('root')
// );
