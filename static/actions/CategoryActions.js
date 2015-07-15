var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var CategoryActions = {
    change_category: function(cat) {
        AppDispatcher.dispatch({
            actionType: BookConstants.CATEGORY_CHANGE,
            cat: cat
        });
    },
    change_subcategory: function(cat) {
        AppDispatcher.dispatch({
            actionType: BookConstants.SUBCATEGORY_CHANGE,
            cat: cat
        });
    },
    count_stats: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.COUNT_STATS
        });
    }
};

module.exports.CategoryActions = CategoryActions;
