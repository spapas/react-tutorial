var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants');
var CategoryActions = require('../actions/CategoryActions').CategoryActions;

var _state = {
    categories: [],
    subcategories: []
}

var _props = {
    categories_url: '/api/categories/',
    subcategories_url: '/api/subcategories/'
}


var _load_categories = function() {
    console.log("LOAD")
    $.ajax({
        url: _props.categories_url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.categories = data;
            CategoryStore.emitChange();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
            CategoryStore.emitChange();
        }
    });
};

var _load_subcategories = function(cat) {
    
    if(!cat) {
        _state.subcategories = [];
        CategoryStore.emitChange();
        return ;
    }
    $.ajax({
        url: _props.subcategories_url+'?category='+cat,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.subcategories = data;
            CategoryStore.emitChange();
            CategoryActions.count_stats()
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
            CategoryStore.emitChange();
        }
    });
};

var CategoryStore = $.extend({}, EventEmitter.prototype, {
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


CategoryStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case BookConstants.CATEGORY_CHANGE:
            _load_subcategories(action.cat);
        break;
        case BookConstants.SUBCATEGORY_CHANGE:
        break;
        case BookConstants.BOOK_EDIT_CANCEL:
            CategoryStore.emitChange();
        break;
    }
    return true;
});


module.exports.CategoryStore = CategoryStore;
module.exports.loadCategories = _load_categories;