import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Provider } from 'react-redux'

import store from './store'
import { history } from './store'

import App from './components/app';
import BookPanel from './components/BookPanel.react';
import BookForm from './components/BookForm.react';

const About = () => {
    return <div>
        <h2>About</h2>
        <Link to="/">Home</Link>
    </div>
}

const NoMatch = () => {
    return <div>
        <h2>No match</h2>
        <Link to="/">Home</Link>
    </div>
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={BookPanel}/>
                <Route path="/book_update/:id" component={BookForm}/>
                <Route path="/about" component={About}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
  ), document.getElementById('content')
)



