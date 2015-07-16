var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants');
var MessageActions = require('../actions/MessageActions').MessageActions;

var _state = {
    authors: [],
    showDialog: false
}

var _props = {
    authors_url: '/api/authors/'
}

var _load_authors = function() {
    $.ajax({
        url: _props.authors_url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.authors = data.map(function(a){
                return {
                    id: a.id,
                    name: a.last_name+' '+a.first_name
                }
            });
            AuthorStore.emitChange();
        },
        error: function(xhr, status, err) {
            MessageActions.add_message_error(err.toString());
            BookStore.emitChange();
        }
    });
};


var _deleteAuthor = function(authorId) {
    $.ajax({
        url: _props.authors_url+authorId,
        method: 'DELETE',
        cache: false,
        success: function(data) {
            MessageActions.add_message_ok("Author delete ok");
            BookStore.emitChange();
            _load_authors();
        },
        error: function(xhr, status, err) {
            MessageActions.add_message_error(err.toString());
            BookStore.emitChange();
        }
    });
};

var _addAuthor = function(author) {
    $.ajax({
        url: _props.authors_url,
        dataType: 'json',
        method: 'POST',
        data:author,
        cache: false,
        success: function(data) {
            MessageActions.add_message_ok("Author add  ok");
            _state.showDialog = false;
            _load_authors();
        },
        error: function(xhr, status, err) {
            MessageActions.add_message_error(err.toString());
            BookStore.emitChange();
        }
    });

};

var AuthorStore = $.extend({}, EventEmitter.prototype, {
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


AuthorStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case BookConstants.SHOW_ADD_AUTHOR:
            _state.showDialog = true;
            AuthorStore.emitChange();
        break;
        case BookConstants.HIDE_ADD_AUTHOR:
            _state.showDialog = false;
            AuthorStore.emitChange();
        break;
        case BookConstants.AUTHOR_ADD:
            _addAuthor(action.author);
        break;
        case BookConstants.AUTHOR_DELETE:
            _deleteAuthor(action.authorId);
        break;
    }
    return true;
});


module.exports.AuthorStore = AuthorStore;
module.exports.loadAuthors = _load_authors;