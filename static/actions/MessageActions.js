var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var BookConstants = require('../constants/BookConstants')

var MessageActions = {
    add_message_ok: function(msg) {
        AppDispatcher.dispatch({
            actionType: BookConstants.MESSAGE_ADD,
            message: {
                color: 'green',
                text: msg
            }
        });
    },
    add_message_error: function(msg) {
        AppDispatcher.dispatch({
            actionType: BookConstants.MESSAGE_ADD,
            message: {
                color: 'green',
                text: msg
            }
        });
    }
};

module.exports.MessageActions = MessageActions;
