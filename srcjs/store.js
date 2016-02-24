import { syncHistory, routeReducer } from 'react-router-redux'
import { ui, books, notification, categories, authors } from './reducers'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/lib/createHashHistory'

// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
    queryKey: false
});

const combineReducers2 = o => {
    return (state={}, action) => {
        const mapped = Object.keys(o).map(k => (
            {
                key: k,
                slice: o[k](state[k], action)
            }
        ))
        
        const reduced = mapped.reduce((s, x)=>{
            s[x['key']]=x['slice']
            return s
        }, {})
        
        return reduced;
    }
}

const combineReducers3 = o => (state={}, action) => Object.keys(o).map(k => [
    k, o[k](state[k], action)
]).reduce((s, x) => Object.assign(s, {
    [x[0]]: x[1]
}), {})
    
    
//const reducer = combineReducers3(Object.assign({}, { 
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

const logStateMiddleware = ({dispatch, getState}) => next => action => {
    console.log(action.type, getState())
    next(action)
}

const store = createStore(reducer, applyMiddleware(
    thunk, reduxRouterMiddleware
));

export default store
