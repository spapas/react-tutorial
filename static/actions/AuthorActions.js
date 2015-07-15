var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var AuthorActions = {
    show_add_author: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.SHOW_ADD_AUTHOR
        });
    },
    hide_add_author: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.HIDE_ADD_AUTHOR
        });
    },
    add_author_ok: function(author) {
        AppDispatcher.dispatch({
            actionType: BookConstants.AUTHOR_ADD,
            author: author
        });
    },
    delete_author: function(id) {
        AppDispatcher.dispatch({
            actionType: BookConstants.AUTHOR_DELETE,
            authorId: id
        });
    }
};

module.exports.AuthorActions = AuthorActions;
