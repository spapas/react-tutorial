import React from 'react'
import { connect } from 'react-redux'
import BookTable from './BookTable.react'
import { loadBooks } from '../actions'
import { Link } from 'react-router'

class BookPanel extends React.Component {
    render() {
        
        let { rows, count } = this.props.books;
        let { isLoading } = this.props.ui;
        return(
            <div className="row">
                {isLoading?<div className="loading">Loading&#8230;</div>:null}
                <div className="twelve columns">
                    <h3>Book list <Link className='button' to="/book_create/">+</Link></h3>
                    {isLoading?"...":<BookTable rows={rows} />}
                </div>
            </div>
        );
    }
    
    componentDidMount() {
        if(this.props.books.rows.length==0) {
            this.props.dispatch(loadBooks());
        }
    }
}

var mapStateToProps = function(state) {
    return {
        books:state.books,
        ui:state.ui,
    } 
};

export default connect(mapStateToProps)(BookPanel);
