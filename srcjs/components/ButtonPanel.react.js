var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;

var ButtonPanel = React.createClass({
    render: function() {
        return(
            <div className="row">
                <input type='submit' value={this.props.book.id?"Save (id = " +this.props.book.id+ ")":"Add"} />
                {this.props.book.id?<button onClick={this.onDeleteClick}>Delete</button>:""}
                {this.props.book.id?<button onClick={this.onCancelClick}>Cancel</button>:""}
                {this.props.message?<div className={this.props.message.color}>{this.props.message.text}</div>:""}
            </div>
        );
    },
    onCancelClick: function(e) {
        e.preventDefault();
        BookActions.edit_cancel()
    },
    onDeleteClick: function(e) {
        e.preventDefault();
        BookActions.delete(this.props.book.id)
    }
})


module.exports.ButtonPanel = ButtonPanel;