var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var CategoryActions = {
    count_stats: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.COUNT_STATS
        });
    }
};

module.exports.CategoryActions = CategoryActions;
