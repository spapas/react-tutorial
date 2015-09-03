var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')
var MessageActions = require('../actions/MessageActions').MessageActions;


function getUrlParameter(sParam) {
    var sPageURL = $(location).attr('hash');
    sPageURL = sPageURL.substr(1)
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)  {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)  {
            return sParameterName[1];
        }
    }
}

var _page_init = 1*getUrlParameter('page');
if(!_page_init) _page_init = 1 ;
var _ordering_init = getUrlParameter('ordering');
if(!_ordering_init) _ordering_init = '' ;
var _query_init = getUrlParameter('query');
if(!_query_init) _query_init = ''

var _state = {
    loading: false,
    books: [],
    message:{},
    page: _page_init,
    total: 0,
    editingBook: {},
    query: _query_init,
    ordering: _ordering_init
}

var _props = {
    url: '/api/books/'
}

var _search = function() {
    _state.loading = true;
    BookStore.emitChange();
    
    $.ajax({
        url: _props.url+'?search='+_state.query+"&ordering="+_state.ordering+"&page="+_state.page,
        dataType: 'json',
        cache: false,
        success: function(data) {
            // Simulate a small delay in server response
            setTimeout(function() {
                _state.books = data.results;
                _state.total = data.count;
                _state.loading = false;
                BookStore.emitChange();
            }, 400);
        },
        error: function(xhr, status, err) {
            _state.loading = false;
            MessageActions.add_message_error(err.toString());
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
            MessageActions.add_message_ok("Successfully deleted book!");
            _clearEditingBook();
            _reloadBooks();
        },
        error: function(xhr, status, err) {
            MessageActions.add_message_error(err.toString());
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
                MessageActions.add_message_ok("Successfully updated book!");
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                MessageActions.add_message_error(err.toString());
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
                MessageActions.add_message_ok("Successfully added book!");
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                MessageActions.add_message_error(err.toString());
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

var _update_href = function() {
    var hash = 'page='+_state.page;
    hash += '&ordering='+_state.ordering;
    hash += '&query='+_state.query;
    $(location).attr('hash', hash);
}

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
            _state.page = 1;
            _update_href();
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
            _update_href();
            _search();
        break;
        case BookConstants.AUTHOR_DELETE_OK:
            console.log("AUTTHOR DEL OK");
            _search();
        break;
        case BookConstants.BOOK_SORT:
            _state.page = 1;
            if(_state.ordering == action.field) {
                _state.ordering = '-'+_state.ordering
            } else {
                _state.ordering = action.field;
            }
            _update_href();
            _search();
        break;
    }
    return true;
});


module.exports.BookStore = BookStore;
module.exports.reloadBooks = _reloadBooks;
