import TodoList from './TodoList'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

const mapStateToProps = (state, { params }) => ({
    todos: getVisibleTodos(state.todos, params.filter || 'all') 
})

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList))

export default VisibleTodoList