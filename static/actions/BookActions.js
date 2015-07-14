var BookConstants = require('../constants/BookConstants')
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;

var BookActions = {
    change_book: function(book) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_CHANGE,
            book: book
        });
    },
    sort_books: function(field) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_SORT,
            field: field
        });
    },
    change_page: function(page) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_PAGE,
            page: page
        });
    },
    search: function(query) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_SEARCH,
            query: query
        });
    },
    save: function(book) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_SAVE,
            book: book
        });
    },
    edit: function(book) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_EDIT,
            book: book
        });
    },
    edit_cancel: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_EDIT_CANCEL
        });
    },
    delete: function(bookId) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_DELETE,
            bookId: bookId
        });
    }
};


module.exports.BookActions = BookActions;
