import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadBooks, loadAuthors } from '../actions'
import NotificationContainer from './notification';
import LoadingContainer from './loading';
import StatPanel from './StatPanel'
import { bindActionCreators } from 'redux'

class App extends React.Component {

    render() {
        const { isLoading } = this.props.ui;
        return <div>

            {this.props.children}

            <NotificationContainer />
            <LoadingContainer isLoading={isLoading} />

            <br />

            <StatPanel bookLength={this.props.books.count} authorLength={this.props.authors.rows.length} />
            <Link className='button' to="/">Books</Link>
            <Link className='button' to="/authors/">Authors</Link>

        </div>
    }

    componentDidMount() {
        let { loadBooks, loadAuthors } = this.props;
        
        if(this.props.books.rows.length==0) {
            loadBooks();
        }
        if(this.props.authors.rows.length==0) {
            loadAuthors();
        }
    }
}

const mapStateToProps = state => ({
	books:state.books,
	authors:state.authors,
	ui:state.ui,
})


const mapDispatchToProps = dispatch => bindActionCreators({ 
	loadBooks, loadAuthors 
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App);
