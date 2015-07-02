var React = require('react');
var BookTableRow = require('./BookTableRow.react').BookTableRow;

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
                        <th>Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

module.exports.BookTable = BookTable ;