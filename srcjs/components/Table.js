import React from 'react';

const formatHeader = ({key, label}, sorting) => (sorting==key)?('+'+label):(
	(sorting=='-'+key)?('-'+label):label
)

export default (props) => {
    const headers = props.cols.map(col => <th key={col.key}>
        {col.sorting?<a href='#' onClick={e => {
            e.preventDefault();
            col.sorting()
        }}>	
            {formatHeader(col, props.sorting)}
        </a>:col.label
        }
    </th>)
    const rows = props.rows.map(row => <tr key={row.id}>
        {
            props.cols.map(col => <td key={col.key}>
                {(col.format?col.format(row):row[col.key])}
            </td>)
        }
    </tr>)
        
    return <table>
		<thead>
			<tr>
				{headers}
			</tr>
		</thead>
		<tbody>
			{rows}
		</tbody>
	</table>
}


