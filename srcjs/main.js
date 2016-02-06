import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Provider } from 'react-redux'

import store from './store'
import { history } from './store'

import App from './components/app';
import BookPanel from './components/BookPanel';
import AuthorPanel from './components/AuthorPanel';
import BookForm from './components/BookForm';
import AuthorForm from './components/AuthorForm';

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
                <Route path="/book_create/" component={BookForm} />
                <Route path="/book_update/:id" component={BookForm} />
                
                <Route path="/authors/" component={AuthorPanel} />
                <Route path="/author_create/" component={AuthorForm} />
                <Route path="/author_update/:id" component={AuthorForm} />
                
                <Route path="/about" component={About}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
  ), document.getElementById('content')
)



