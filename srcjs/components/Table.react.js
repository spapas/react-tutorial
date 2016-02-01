import React from 'react';

export default (props) => {
    let headers = props.cols.map(col => <th key={col.key}>
        {col.sorting?<a href='#' onClick={e => {
            e.preventDefault();
            col.sorting()
        }}>
            {(props.sorting==col.key)?('+'+col.label):(
                (props.sorting=='-'+col.key)?('-'+col.label):col.label
            )}
        </a>:col.label
        }
    </th>)
    let rows = props.rows.map(row => <tr key={row.id}>
        {
            props.cols.map(col => <td key={col.key}>
                {(col.format?col.format(row):row[col.key])}
            </td>)
        }
    </tr>)
        
    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}


