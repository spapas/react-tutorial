import React from 'react'
import { connect } from 'react-redux'
import BookTable from './BookTable.react'
import { loadBooks } from '../actions'

class BookPanel extends React.Component {
    render() {
        let { books, count } = this.props.books;
        let { isLoading } = this.props.ui;
        return(
            <div className="row">
                {isLoading?<div className="loading">Loading&#8230;</div>:null}
                <div className="one column">
                    {isLoading?"LOADING":<BookTable books={books} />}
                </div>
            </div>
        );
    }
    
    componentDidMount() {
        if(this.props.books.books.length==0) {
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
