

export const notification = (state={}, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            let { notification_type, message } = action
            return Object.assign({}, state, {
                message,
                notification_type,
            })
        case 'CLEAR_NOTIFICATION':
            return {}
    }
    return state;
}

export const filters = (state={}, action) => {
    switch (action.type) {
        case 'CHANGE_FILTERS':
            let { filters } = action
            return Object.assign({}, state, filters)
        case 'CLEAR_FILTERS':
            return {}
    }
    return state;
}

export const ui = (state={}, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
            break;

        return Object.assign({}, state, {showAddRemarkModal})
        
    }
    return state;
}

const BOOKS_INITIAL = {
    books: [],
    coun: 0,
}
export const books = (state=BOOKS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_BOOKS':
            return Object.assign({}, state, {
                books: action.books.results,
                count: action.books.count,
            });
            break;

        return Object.assign({}, state, {showAddRemarkModal})
        
    }
    return state;
}


export const other = (state={}, action) => {
    switch (action.type) {       

        case 'IS_SUBMITTING':
            return Object.assign({}, state, {
                isSubmitting: action.isSubmitting
            });
            break;
        case 'SHOW_PROSTIMA':
            return Object.assign({}, state, {
                prostima_count: action.prostima.count,
                prostimaCache: Object.assign({}, state.prostimaCache, {
                    [action.page]: action.prostima.results
                })
            });
            break;
        case 'SHOW_PROSTIMO':
            return Object.assign({}, state, {
                prostimo: action.prostimo
            });
            break;
        case 'RELOAD_PROSTIMA':
            return Object.assign({}, state, {
                prostimo: undefined,
                prostimaCache: {},
            });
            break;
        case 'APPEND_PROSTIMO_REMARK':
            return Object.assign({}, state, {
                prostimo: Object.assign({}, state.prostimo, {
                    remark_set: [
                            action.remark,
                            ...state.prostimo.remark_set
                    ]
                })
            });
            break;
      
    }
    return state;
}
