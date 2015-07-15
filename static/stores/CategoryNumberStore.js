var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')
var CategoryStore = require('./CategoryStore').CategoryStore;


var _state = {
    category_books: "-",
    subcategory_books: "-"
}

_category = undefined;
_subcategory = undefined;

var CategoryNumberStore = $.extend({}, EventEmitter.prototype, {
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

var _get_stats = function() {
    var i;
    var categoryState = CategoryStore.getState();

    _state = {
        category_books: "-",
        subcategory_books: "-"
    }

    for(i=0;i<categoryState.categories.length;i++) {
        if(categoryState.categories[i].id == _category) {
            _state.category_books = categoryState.categories[i].number_of_books;
        }
    }

    for(i=0;i<categoryState.subcategories.length;i++) {
        if(categoryState.subcategories[i].id == _subcategory ) {
            _state.subcategory_books = categoryState.subcategories[i].number_of_books;
        }
    }
}

CategoryNumberStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case BookConstants.BOOK_EDIT:
            _category = action.book.category;
            _subcategory = action.book.subcategory;
            _get_stats();
            CategoryNumberStore.emitChange();
        break;
        case BookConstants.BOOK_CHANGE:
            _category = action.book.category;
            _subcategory = action.book.subcategory;
            _get_stats();
            CategoryNumberStore.emitChange();
        break;
        case BookConstants.COUNT_STATS:
            _get_stats();
            CategoryNumberStore.emitChange();
        break;
        case BookConstants.BOOK_EDIT_CANCEL:
            _category = undefined;
            _subcategory = undefined;
            _get_stats();
            CategoryNumberStore.emitChange();
        break;
    }
    return true;
});


module.exports.CategoryNumberStore = CategoryNumberStore;
