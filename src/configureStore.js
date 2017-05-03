import { createStore } from 'redux'
import { LoadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import todoApp from './reducers'

const configureStore = () => {
    const store = createStore(todoApp)
    store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    })
    }, 1000))

    return store
}

export default configureStore