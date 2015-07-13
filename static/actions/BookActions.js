var Dispatcher = require('flux').Dispatcher;
var BookConstants = require('../constants/BookConstants')
var AppDispatcher = new Dispatcher();


var BookActions = {
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
    },
    change_category: function(cat) {
        AppDispatcher.dispatch({
            actionType: BookConstants.CATEGORY_CHANGE,
            cat: cat
        });
    }
};


module.exports.BookActions = BookActions;
module.exports.AppDispatcher = AppDispatcher;