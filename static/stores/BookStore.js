var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../actions/BookActions').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var _state = {
    books: [],
    message:"",
    editingBook: null
}

var _props = {
    url: '/api/books/'
}

var _search = function(query) {
    $.ajax({
        url: _props.url+'?search='+query,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.books = data;
            BookStore.emitChange();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
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
            _state.message = "Successfully deleted book!"
            _clearEditingBook();
            _reloadBooks();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
            BookStore.emitChange();
        }
    });
};

var _saveBook = function(book) {
    if(book.id) {
        $.ajax({
            url: _props.url+book.id,
            dataType: 'json',
            method: 'PUT',
            data:book,
            cache: false,
            success: function(data) {
                _state.message = "Successfully updated book!"
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message = err.toString()
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
                _state.message = "Successfully added book!"
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message = err.toString()
                BookStore.emitChange();
            }
        });
    }
};

var _clearEditingBook = function() {
    _state.editingBook = null;
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

/*
var BookStore = {
    listeners: [],
    getState: function() {
        return _state;
    },
    emitChange: function() {
        var i;
        for(i=0;i<this.listeners.length;i++) {
            this.listeners[i]();
        }
    },
    addChangeListener: function(callback) {
        this.listeners.push(callback);
    },
    removeChangeListener: function(callback) {
        this.listeners.splice(this.listeners.indexOf(callback), 1);
    }
};
*/

AppDispatcher.register(function(action) {
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
            _search(action.query);
        break;
        case BookConstants.BOOK_DELETE:
            _deleteBook(action.bookId);
        break;
    }
    return true;
});


module.exports.BookStore = BookStore;
module.exports.reloadBooks = _reloadBooks;