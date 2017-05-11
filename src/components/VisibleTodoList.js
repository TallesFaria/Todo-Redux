import React, { Component } from 'react'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router'
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers'
import FetchError from './FetchError'

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
        fetchTodos(filter).then(() => console.log('Done!'))
    }

    render(){
        const { toggleTodo, errorMessage, todos, isFetching } = this.props
        if(isFetching && !todos.length) {
            return <p> Loading... </p>
        }
        if(errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            )
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
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
})

VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))

export default VisibleTodoList