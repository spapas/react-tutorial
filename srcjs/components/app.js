import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadBooks, loadAuthors } from '../actions'
import NotificationContainer from './notification';
import LoadingContainer from './loading.react';
import StatPanel from './StatPanel.react'

class App extends React.Component {

    render() {
        const bookLength = this.props.books.count;
        const authorLength = this.props.authors.rows.length;
        const { isLoading } = this.props.ui;

        return <div>

            {this.props.children}

            <NotificationContainer />
            <LoadingContainer isLoading={isLoading} />

            <br />


            <StatPanel bookLength={bookLength} authorLength={authorLength} />
            <Link className='button' to="/">Books</Link>
            <Link className='button' to="/authors/">Authors</Link>

        </div>
    }

    componentDidMount() {
        if(this.props.books.rows.length==0) {
            this.props.dispatch(loadBooks());
        }
        if(this.props.authors.rows.length==0) {
            this.props.dispatch(loadAuthors());
        }
    }
}

var mapStateToProps = function(state) {
    return {
        books:state.books,
        authors:state.authors,
        ui:state.ui,
    }
};

export default connect(mapStateToProps)(App);
