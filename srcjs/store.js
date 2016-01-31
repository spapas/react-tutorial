import { syncHistory, routeReducer } from 'react-router-redux'
import { ui, books, notification, filters } from './reducers'
import createHistory from 'history/lib/createHashHistory'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers, compose  } from 'redux'
import { reducer as formReducer } from 'redux-form';
       

const reducer = combineReducers(Object.assign({}, { 
        books, 
        notification,
        filters,
        ui,
    }, {
        routing: routeReducer
    }, {
        form: formReducer     
    })
)


// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
  queryKey: false
});

const reduxRouterMiddleware = syncHistory(history)

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware)
)(createStore);

const store = createStoreWithMiddleware(reducer);

reduxRouterMiddleware.listenForReplays(store)

export default store