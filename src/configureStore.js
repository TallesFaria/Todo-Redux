import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import todoApp from './reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
    const middlewares = [thunk]
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    )
}

export default configureStore