var React = require('react');
var BookStore = require('../stores/BookStore').BookStore;
var AuthorStore = require('../stores/AuthorStore').AuthorStore;

var StatPanel = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var book_len = '-';
        var author_len = '-';
        if(this.state.books) {
            book_len = this.state.books.length
        }
        if(this.state.authors) {
            author_len = this.state.authors.length
        }
        return(
            <div className="row">
                <div className="one-half column">
                    Books number: {book_len}
                </div>
                <div className="one-half column">
                    Authors number: {author_len}
                </div>
                <br />
            </div>
        );
    },
    _onBookChange: function() {
        this.setState({
            books:BookStore.getState().books
        });
    },
    _onAuthorChange: function() {
        this.setState({
            authors: AuthorStore.getState().authors
        });
    },
    componentWillUnmount: function() {
        AuthorStore.removeChangeListener(this._onAuthorChange);
        BookStore.removeChangeListener(this._onBookChange);
    },
    componentDidMount: function() {
        AuthorStore.addChangeListener(this._onAuthorChange);
        BookStore.addChangeListener(this._onBookChange);
    }
});

module.exports.StatPanel = StatPanel ;

