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

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            }
        default:
            return state
    }
}

export default byId

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state
    case 'active':
      return state.filter(t => !t.completed)
    case 'completed':
      return state.filter(t => t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}