

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

export function loadingRowsChangedAction(isLoadingRows) {
    return {
        type: "IS_LOADING_ROWS",
        isLoadingRows
    }
}

export function appendProstimoRemark(remark) {
    return {
        type: "APPEND_PROSTIMO_REMARK",
        remark
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

export function reloadProstima() {
    return {
        type: 'RELOAD_PROSTIMA'
    }
}

export function changeFilters(filters) {
    return {
        type: 'CHANGE_FILTERS',
        filters
    }
}

export function clearFilters(filters) {
    return {
        type: 'CLEAR_FILTERS'
    }
}

export function changeAddRemarkModal(showAddRemarkModal) {
    return {
        type: 'CHANGE_ADD_REMARK',
        showAddRemarkModal
    }
}


export function loadBooks(page=1) {
    return (dispatch, getState) => {
        let url = `//127.0.0.1:8000/api/books/?format=json&page=${page}`;
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
