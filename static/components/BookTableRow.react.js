var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;

var BookTableRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.book.id}</td>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.category_name}</td>
                <td>{this.props.book.publish_date}</td>
                <td>{this.props.book.author_name}</td>
                <td><a href='#' onClick={this.onClick}>Edit</a></td>
            </tr>
        );
    },
    onClick: function(e) {
        e.preventDefault();
        BookActions.edit($.extend({}, this.props.book));
    }
});

module.exports.BookTableRow = BookTableRow;