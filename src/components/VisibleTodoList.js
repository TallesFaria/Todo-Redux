import React, { Component } from 'react'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router'
import { getVisibleTodos, getIsFetching } from '../reducers'

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData()
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter){
            this.fetchData()
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props
        fetchTodos(filter)//.then(() => console.log('Done!'))
    }

    render(){
        const { toggleTodo, todos, isFetching } = this.props
        if(isFetching && !todos.length) {
            return <p> Loading... </p>
        }
        return (
            <TodoList 
                todos={todos} 
                onTodoClick={toggleTodo} 
            />
        )
    }
}

fecthTodos('all').then(todos => console.log(todos))

const mapStateToProps = (state, { params }) => ({
    const filter = params.filter || 'all'
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter)
        filter
    }
})

VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))

export default VisibleTodoList