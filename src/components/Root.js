import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { Router, Route }  from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/:filter?" component={App} />
            {/*<Route path="/:filter" component={App} />*/}
        </Router>
    </Provider>
)

export default Root