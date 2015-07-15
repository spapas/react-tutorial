var React = require('react');
var BookTableRow = require('./BookTableRow.react').BookTableRow;
var BookActions = require('../actions/BookActions').BookActions;

var BookTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.books.forEach(function(book) {
            rows.push(<BookTableRow key={book.id} book={book} />);
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th><a href='#' onClick={this.onClick.bind(this, 'id')}>{this.showOrdering('id')} Id</a></th>
                        <th><a href='#' onClick={this.onClick.bind(this, 'title')}>{this.showOrdering('title')} Title</a></th>
                        <th><a href='#' onClick={this.onClick.bind(this, 'subcategory__name')}>{this.showOrdering('subcategory__name')} Category</a></th>
                        <th><a href='#' onClick={this.onClick.bind(this, 'publish_date')}>{this.showOrdering('publish_date')} Publish date</a></th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    },
    onClick: function(v, e) {
        e.preventDefault();
        BookActions.sort_books(v);
    },
    showOrdering: function(v) {
        if (v==this.props.ordering) {
            return '+'
        } else if ('-'+v==this.props.ordering) {
            return '-'
        }
    }
});

module.exports.BookTable = BookTable ;