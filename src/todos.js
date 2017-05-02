import deepFreeze from 'deep-freeze'
import expect from 'expect'

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

const testeAddTodo = () => {
    const stateBefore = []
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    }
    const stateAfter = [
        {
            completed: false,
            id: 0,
            text: 'Learn Redux'
        }
    ]
    
    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(todos(stateBefore, action)).toEqual(stateAfter)
}

const testeToggleTodo = () => {
    const stateBefore = [
        {
            completed: false,
            id: 0,
            text: 'Learn Redux'    
        },
        {
            completed: false,
            id: 1,
            text: 'Go Shopping!'    
        }
    ]
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }
    const stateAfter = [
        {
            completed: false,
            id: 0,
            text: 'Learn Redux'    
        },
        {
            completed: true,
            id: 1,
            text: 'Go Shopping!'    
        }
    ]
    
    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(todos(stateBefore, action)).toEqual(stateAfter)
}

testeAddTodo()
testeToggleTodo()
console.log('All tests passed!')