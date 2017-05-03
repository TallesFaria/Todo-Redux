import TodoList from './TodoList'
import { connect } from 'react-redux'
import getVisibleTodos from '../reducers/getVisibleTodos'
import { toggleTodo } from '../actions/index'

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter) 
})

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {dispatch(toggleTodo(id))}
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList