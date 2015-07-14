var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var _state = {
    books: [],
    message:{},
    page: 1,
    total: 0,
    editingBook: {},
    query:'',
    ordering:''
}

var _props = {
    url: '/api/books/'
}

var _search = function() {
    $.ajax({
        url: _props.url+'?search='+_state.query+"&ordering="+_state.ordering+"&page="+_state.page,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.books = data.results;
            _state.total = data.count;
            
            BookStore.emitChange();
        },
        error: function(xhr, status, err) {
            _state.message.text = err.toString();
            _state.message.color  = 'red'
            BookStore.emitChange();
        }
    });
};

var _reloadBooks = function() {
    _search('');
};

var _deleteBook = function(bookId) {
    $.ajax({
        url: _props.url+bookId,
        method: 'DELETE',
        cache: false,
        success: function(data) {
            _state.message.text = "Successfully deleted book!"
            _state.message.color = 'green'
            _clearEditingBook();
            _reloadBooks();
        },
        error: function(xhr, status, err) {
            _state.message = err.toString();
            _state.message.color = 'red'
            BookStore.emitChange();
        }
    });
};

var _saveBook = function(book) {
    delete book.category;
    if(book.id) {
        $.ajax({
            url: _props.url+book.id,
            dataType: 'json',
            method: 'PUT',
            data:book,
            cache: false,
            success: function(data) {
                _state.message.text = "Successfully updated book!"
                _state.message.color  = 'green'
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message.text = err.toString()
                _state.message.color  = 'red'
                BookStore.emitChange();
            }
        });
    } else {
        $.ajax({
            url: _props.url,
            dataType: 'json',
            method: 'POST',
            data:book,
            cache: false,
            success: function(data) {
                _state.message.text = "Successfully added book!"
                _state.message.color  = 'green'
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message.text = err.toString()
                _state.message.color  = 'red'
                BookStore.emitChange();
            }
        });
    }
};

var _clearEditingBook = function() {
    _state.editingBook = {};
};

var _editBook = function(book) {
    _state.editingBook = book;
    BookStore.emitChange();
};

var _cancelEditBook = function() {
    _clearEditingBook();
    BookStore.emitChange();
};


var BookStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});


BookStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case BookConstants.BOOK_EDIT:
            _editBook(action.book);
        break;
        case BookConstants.BOOK_EDIT_CANCEL:
            _cancelEditBook();
        break;
        case BookConstants.BOOK_SAVE:
            _saveBook(action.book);
        break;
        case BookConstants.BOOK_SEARCH:
            _state.query = action.query
            _search();
        break;
        case BookConstants.BOOK_DELETE:
            _deleteBook(action.bookId);
        break;
        case BookConstants.BOOK_CHANGE:
            _state.editingBook = action.book; 
            BookStore.emitChange();
        break;
        case BookConstants.BOOK_PAGE:
            _state.page = action.page; 
            _search();
        break;
        case BookConstants.BOOK_SORT:
            if(_state.ordering == action.field) {
                _state.ordering = '-'+_state.ordering
            } else {
                _state.ordering = action.field;
            }
            _search();
        break;
    }
    return true;
});


module.exports.BookStore = BookStore;
module.exports.reloadBooks = _reloadBooks;
