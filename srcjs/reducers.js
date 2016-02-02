

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
    rows: [],
    count: 0,
    page: 1,
    sorting: undefined,
    search: undefined,
    book: {},
}
export const books = (state=BOOKS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_BOOKS':
            return Object.assign({}, state, {
                rows: action.books.results,
                count: action.books.count,
            });
            break;
        case 'SHOW_BOOK':
            return Object.assign({}, state, {
                book: action.book
            });
            break;
        case 'CHANGE_PAGE':
            return Object.assign({}, state, {
                page: action.page
            });
            break;
        case 'TOGGLE_SORTING':
            return Object.assign({}, state, {
                sorting: (state.sorting==action.sorting)?('-'+action.sorting):action.sorting
            });
            break;
        case 'CHANGE_SEARCH':
            return Object.assign({}, state, {
                search: action.search
            });
            break;

    }
    return state;
}

const AUTHORS_INITIAL = {
    rows: [],
    author: {},
}
export const authors = (state=AUTHORS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_AUTHORS':
            return Object.assign({}, state, {
                rows: action.authors
            });
            break;
        case 'SHOW_AUTHOR':
            return Object.assign({}, state, {
                author: action.author
            });
            break;

    }
    return state;
}

const CATEGORIES_INITIAL = {
    categories: [],
    subcategories: [],
}

export const categories = (state=CATEGORIES_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.categories
            });
            break;
        case 'SHOW_SUBCATEGORIES':
            return Object.assign({}, state, {
                subcategories: action.subcategories
            });
            break;
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
