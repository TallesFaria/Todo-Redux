import { createStore } from 'redux'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import todoApp from './reducers'

// const addLoggintToDispatch = (store) => {
//     const rawDispatch = store.dispatch
//     return(action) => {
//         console.group(action.type)
//         console.log('prev state', store.getState())
//         console.log('action', action)
//         const returnValue = rawDispatch(action)
//         console.groupEnd(action.type)
//     }
// }

const configureStore = () => {
    const persistedState = loadState()
    const store = createStore(todoApp, persistedState)

    // //store.dispatch = addLogginToDispatch(store)

    store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    })
    }, 1000))

    return store
}

export default configureStore