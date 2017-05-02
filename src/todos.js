import deepFreeze from 'deep-freeze'
import expect from 'expect'


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ] 
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

testeAddTodo()
console.log('All tests passed!')