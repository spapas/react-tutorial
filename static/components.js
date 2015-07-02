var React = require('react');
var BookStore = require('./stores').BookStore;
var BookActions = require('./actions').BookActions;

var BookTableRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.book.id}</td>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.category}</td>
                <td><a href='#' onClick={this.onClick}>Edit</a></td>
            </tr>
        );
    },
    onClick: function(e) {
        e.preventDefault();
        BookActions.edit(this.props.book);
    }
});

var BookTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.books.forEach(function(book) {
            rows.push(<BookTableRow key={book.id} book={book} />);
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var BookForm = React.createClass({
    getInitialState: function() {
        if (this.props.book) {
            return this.props.book;
        } else {
            return {};
        }
    },
    componentWillReceiveProps: function(props) {
        if (props.book) {
            this.setState(props.book);
        } else {
            this.replaceState({});
        }
    },
    render: function() {
        return(
            <form onSubmit={this.onSubmit}>
                <label forHtml='title'>Title</label><input ref='title' name='title' type='text' value={this.state.title} onChange={this.onFormChange} />
                <label forHtml='category'>Category</label>
                <select ref='category' name='category' value={this.state.category} onChange={this.onFormChange} >
                    <option value='CRIME' >Crime</option>
                    <option value='HISTORY'>History</option>
                    <option value='HORROR'>Horror</option>
                    <option value='SCIFI'>SciFi</option>
                </select>
                <br />
                <input type='submit' value={this.state.id?"Save (id = " +this.state.id+ ")":"Add"} />
                {this.state.id?<button onClick={this.onDeleteClick}>Delete</button>:""}
                {this.state.id?<button onClick={this.onCancelClick}>Cancel</button>:""}
                {this.props.message?<div>{this.props.message}</div>:""}
            </form>
        );
    },
    onFormChange: function() {
        this.setState({
            title: React.findDOMNode(this.refs.title).value,
            category: React.findDOMNode(this.refs.category).value
        })
    },
    onSubmit: function(e) {
        e.preventDefault();
        BookActions.save(this.state)
    },
    onCancelClick: function(e) {
        e.preventDefault();
        BookActions.edit_cancel()
    },
    onDeleteClick: function(e) {
        e.preventDefault();
        BookActions.delete(this.state.id)
    }
});

var SearchPanel = React.createClass({
    getInitialState: function() {
        return {
            search: '',
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="one-fourth column">
                    Filter: &nbsp;
                    <input ref='search' name='search' type='text' value={this.state.search} onChange={this.onSearchChange} />
                    {this.state.search?<button onClick={this.onClearSearch} >x</button>:''}
                </div>
            </div>
        )
    },
    onSearchChange: function() {
        var query = React.findDOMNode(this.refs.search).value;
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            search: query
        });
        this.promise = setTimeout(function () {
            BookActions.search(query);
        }.bind(this), 200);
    },
    onClearSearch: function() {
        this.setState({
            search: ''
        });
        BookActions.search('');
    }
});

var BookPanel = React.createClass({
    getInitialState: function() {
        return BookStore.getState();
    },
    render: function() {
        return(
            <div className="row">
                <div className="one-half column">
                    <SearchPanel></SearchPanel>
                    <BookTable books={this.state.books} />
                </div>
                <div className="one-half column">
                    <BookForm
                        book={this.state.editingBook}
                        message={this.state.message}
                    />
                </div>
                <br />
            </div>
        );
    },
    _onChange: function() {
        this.setState( BookStore.getState() );
    },
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        BookStore.addChangeListener(this._onChange);
    }
});

module.exports.BookPanel = BookPanel ;