import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Table from './Table'

const cols = [
    {key: 'id', label: 'id', format: x=><Link to={`/author_update/${x.id}/`}>{x.id}</Link>},
    {key: 'last_name', label: 'Last name',},
    {key: 'first_name', label: 'First name',},
]

const AuthorPanel = (props) => <div className="row">
    <div className="twelve columns">
        <h3>Author list <Link className='button button-primary' style={{fontSize:'1em'}} to="/author_create/">+</Link></h3>
        <Table cols={cols} rows={props.authors.rows} />
    </div>
</div>

const mapStateToProps = (state) => ({
	authors:state.authors,
})

export default connect(mapStateToProps)(AuthorPanel);
