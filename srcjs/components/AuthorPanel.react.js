import React from 'react'
import { connect } from 'react-redux'
import { loadAuthors } from '../actions'
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
        let { isLoading } = this.props.ui;
        

        return(
            <div className="row">
                {isLoading?<div className="loading">Loading&#8230;</div>:null}
                <div className="twelve columns">
                    <h3>Author list <Link className='button' to="/author_create/">+</Link></h3>
                    {isLoading?"...":<Table cols={cols} rows={rows} />}
                </div>
            </div>
        );
    }
    
    componentDidMount() {
        if(this.props.authors.rows.length==0) {
            this.props.dispatch(loadAuthors());
        }
    }
}

var mapStateToProps = function(state) {
    return {
        authors:state.authors,
        ui:state.ui,
    } 
};

export default connect(mapStateToProps)(AuthorPanel);
