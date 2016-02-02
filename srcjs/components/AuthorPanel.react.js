import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Table from './Table.react'

const cols = [
    {key: 'id', label: 'id', format: x=><Link to={`/author_update/${x.id}/`}>{x.id}</Link>},
    {key: 'last_name', label: 'Last name',},
    {key: 'first_name', label: 'First name',},
]

class AuthorPanel extends React.Component {
    render() {
        
        let { rows, count } = this.props.authors;
        
        return(
            <div className="row">
                <div className="twelve columns">
                    <h3>Author list <Link className='button' to="/author_create/">+</Link></h3>
                    <Table cols={cols} rows={rows} />
                </div>
            </div>
        );
    }
}

var mapStateToProps = function(state) {
    return {
        authors:state.authors,
    } 
};

export default connect(mapStateToProps)(AuthorPanel);
