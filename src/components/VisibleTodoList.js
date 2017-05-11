import React, { Component } from 'react'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../reducers'

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
        fetchTodos(filter)
    }

    render(){
        const { toggleTodo, ... rest } = this.props
        return (
            <TodoList 
                {...rest} 
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
        filter
    }
})

VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))

export default VisibleTodoList