import { history } from  './store'
import { formatUrl } from './util/formatters'

export function showBooksResultAction(jsonResult) {
    return {
        type: "SHOW_BOOKS",
        books: jsonResult
    };
}

export function showBookResultAction(jsonResult) {
    return {
        type: "SHOW_BOOK",
        book: jsonResult
    };
}

export function showAuthorsResultAction(jsonResult) {
    return {
        type: "SHOW_AUTHORS",
        authors: jsonResult
    };
}

export function showAuthorResultAction(jsonResult) {
    return {
        type: "SHOW_AUTHOR",
        author: jsonResult
    };
}


export function showCategoriesResultAction(jsonResult) {
    return {
        type: "SHOW_CATEGORIES",
        categories: jsonResult
    };
}

export function showSubCategoriesResultAction(jsonResult) {
    return {
        type: "SHOW_SUBCATEGORIES",
        subcategories: jsonResult
    };
}

export function loadingChangedAction(isLoading) {
    return {
        type: "IS_LOADING",
        isLoading
    }
}

export function submittingChangedAction(isSubmitting) {
    return {
        type: "IS_SUBMITTING",
        isSubmitting
    }
}

export function toggleSorting(sorting) {
    return {
        type: "TOGGLE_SORTING",
        sorting
    }
}

export function changePage(page) {
    return {
        type: "CHANGE_PAGE",
        page
    }
}

export function showSuccessNotification(message) {
    return {
        type: 'SHOW_NOTIFICATION',
        notification_type: 'SUCCESS',
        message
    }
}

export function showErrorNotification(message) {
    return {
        type: 'SHOW_NOTIFICATION',
        notification_type: 'ERROR',
        message
    }
}

export function hideNotification() {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export function changeSearchAndLoadBooks(search) {
    return (dispatch, getState) => {
        dispatch(changeSearch(search))
        history.push( {
            search: formatUrl(getState().books)
        } )
        dispatch(loadBooks())
    }
}

export function toggleSortingAndLoadBooks(sorting) {
    return (dispatch, getState) => {
        dispatch(toggleSorting(sorting))
        history.push( {
            search: formatUrl(getState().books)
        } )
        dispatch(loadBooks())
    }
}


export function changeSearch(search) {
    return {
        type: 'CHANGE_SEARCH',
        search
    }
}


export function loadBooks(page=1) {
    return (dispatch, getState) => {
        let state = getState();
        let { page, sorting, search } = state.books
        let url = `//127.0.0.1:8000/api/books/?format=json&page=${page}`;
        if(sorting) {
            url+=`&ordering=${sorting}`
        }
        if(search) {
            url+=`&search=${search}`
        }
        dispatch(loadingChangedAction(true));
        $.get(url, data => {
            setTimeout(() => {
                dispatch(showBooksResultAction(data));
                dispatch(loadingChangedAction(false));
            }, 1000);
        });
    }
}


export function loadBookAction(id) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/books/${id}/?format=json`;
        dispatch(loadingChangedAction(true));
        $.get(url, function(data) {
            setTimeout(() => {
                dispatch(showBookResultAction(data));
                dispatch(loadingChangedAction(false));
                dispatch(loadSubCategories(data.category));
            }, 1000);
        });
    }
}

export function loadAuthors(page=1) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/authors/?format=json&page=${page}`;
        dispatch(loadingChangedAction(true));
        $.get(url, data => {
            setTimeout(() => {
                dispatch(showAuthorsResultAction(data));
                dispatch(loadingChangedAction(false));
            }, 1000);
        });
    }
}


export function loadAuthorAction(id) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/authors/${id}/?format=json`;
        dispatch(loadingChangedAction(true));
        $.get(url, function(data) {
            setTimeout(() => {
                dispatch(showAuthorResultAction(data));
                dispatch(loadingChangedAction(false));
            }, 1000);
        });
    }
}

export function loadCategories() {
    return (dispatch, getState) => {
        let url = '//127.0.0.1:8000/api/categories/?format=json';

        $.get(url, data => {
            dispatch(showCategoriesResultAction(data));
        });
    }
}

export function loadSubCategories(category) {
    return (dispatch, getState) => {
        
        if(!category) {
            dispatch(showSubCategoriesResultAction([]));
            return 
        }
        let url = `http://127.0.0.1:8000/api/subcategories/?format=json&category=${category}`;

        $.get(url, data => {
            dispatch(showSubCategoriesResultAction(data));
        });
    }
}
