import { history } from  './store'
import { formatUrl } from './util/formatters'

export function showBooksResult(jsonResult) {
    return {
        type: "SHOW_BOOKS",
        books: jsonResult
    };
}

export function showBookResult(jsonResult) {
    return {
        type: "SHOW_BOOK",
        book: jsonResult
    };
}


export function addBookResult(book) {
    return {
        type: "ADD_BOOK",
        book
    };
}

export function updateBookResult(book) {
    return {
        type: "UPDATE_BOOK",
        book
    };
}

export function deleteBookResult(id) {
    return {
        type: "DELETE_BOOK",
        id
    };
}

export function showAuthorsResult(jsonResult) {
    return {
        type: "SHOW_AUTHORS",
        authors: jsonResult
    };
}

export function showAuthorResult(author) {
    return {
        type: "SHOW_AUTHOR",
        author
    };
}

export function addAuthorResult(author) {
    return {
        type: "ADD_AUTHOR",
        author
    };
}

export function updateAuthorResult(author) {
    return {
        type: "UPDATE_AUTHOR",
        author
    };
}

export function deleteAuthorResult(id) {
    return {
        type: "DELETE_AUTHOR",
        id
    };
}

export function showCategoriesResult(jsonResult) {
    return {
        type: "SHOW_CATEGORIES",
        categories: jsonResult
    };
}

export function showSubCategoriesResult(jsonResult) {
    return {
        type: "SHOW_SUBCATEGORIES",
        subcategories: jsonResult
    };
}

export function loadingChanged(isLoading) {
    return {
        type: "IS_LOADING",
        isLoading
    }
}

export function submittingChanged(isSubmitting) {
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

export function changeSearch(search) {
    return {
        type: 'CHANGE_SEARCH',
        search
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
        dispatch(loadingChanged(true));
        $.get(url, data => {
            setTimeout(() => {
                dispatch(showBooksResult(data));
                dispatch(loadingChanged(false));
            }, 1000);
        });
    }
}


export function loadBook(id) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/books/${id}/?format=json`;
        dispatch(loadingChanged(true));
        $.get(url, function(data) {
            dispatch(showBookResult(data));
            dispatch(loadingChanged(false));
            dispatch(loadSubCategories(data.category));
        });
    }
}

export function loadAuthors(page=1) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/authors/?format=json&page=${page}`;
        dispatch(loadingChanged(true));
        $.get(url, data => {
            setTimeout(() => {
                dispatch(showAuthorsResult(data));
                dispatch(loadingChanged(false));
            }, 1000);
        });
    }
}


export function loadAuthor(id) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/authors/${id}/?format=json`;
        dispatch(loadingChanged(true));
        $.get(url, function(data) {
            dispatch(showAuthorResult(data));
            dispatch(loadingChanged(false));
        });
    }
}

export function loadCategories() {
    return (dispatch, getState) => {
        let url = '//127.0.0.1:8000/api/categories/?format=json';

        $.get(url, data => {
            dispatch(showCategoriesResult(data));
        });
    }
}

export function loadSubCategories(category) {
    return (dispatch, getState) => {
        
        if(!category) {
            dispatch(showSubCategoriesResult([]));
            return 
        }
        let url = `//127.0.0.1:8000/api/subcategories/?format=json&category=${category}`;

        $.get(url, data => {
            dispatch(showSubCategoriesResult(data));
        });
    }
}
