import { syncHistory, routeReducer } from 'react-router-redux'
import { ui, books, notification, categories, authors } from './reducers'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers, compose  } from 'redux'
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/lib/createHashHistory'

// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
    queryKey: false
});
       

const reducer = combineReducers(Object.assign({}, { 
        books, 
        notification,
        ui,
        categories,
        authors,
    }, {
        routing: routeReducer
    }, {
        form: formReducer     
    })
)



const reduxRouterMiddleware = syncHistory(history)

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware)
)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store