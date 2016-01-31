import React from 'react';
import { Link } from 'react-router'

export default (props) => <tr>
    <td>{props.book.id}</td>
    <td>{props.book.title}</td>
    <td>{props.book.category_name}</td>
    <td>{props.book.publish_date}</td>
    <td>{props.book.author_name}</td>
    <td><Link to={`/book_update/${props.book.id}`}>Edit</Link></td>
</tr>
        