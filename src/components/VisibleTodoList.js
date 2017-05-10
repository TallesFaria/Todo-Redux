import React, { Component } from 'react'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'

class VisibleTodoList extends Component {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos => console.log(this.props.filter, todos))
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter){
            fetchTodos(this.props.filter).then(todos => console.log(this.props.filter, todos))
        }
    }

    render(){
        return <TodoList {...this.props} />
    }
}

fecthTodos('all').then(todos => console.log(todos))

const mapStateToProps = (state, { params }) => ({
    const filter = params.filter || 'all'
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
})

VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList))

export default VisibleTodoList