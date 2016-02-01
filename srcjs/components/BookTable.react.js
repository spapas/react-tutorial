import React from 'react';
import BookTableRow from './BookTableRow.react';


export default (props) => {
    let rows = props.rows.map(function(book) {
        return <BookTableRow key={book.id} book={book} />;
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}


