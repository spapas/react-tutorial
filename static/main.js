var $ = require('jquery');
var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = new Dispatcher();

var BookConstants = {
      BOOK_EDIT: 'BOOK_EDIT',
      BOOK_EDIT_CANCEL: 'BOOK_EDIT_CANCEL',
      BOOK_SAVE: 'BOOK_SAVE',
      BOOK_SEARCH: 'BOOK_SEARCH',
      BOOK_DELETE: 'BOOK_DELETE',
};

var BookActions = {
    search: function(query) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_SEARCH,
            query: query
        });
    },
    save: function(book) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_SAVE,
            book: book
        });
    },
    edit: function(book) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_EDIT,
            book: book
        });
    },
    edit_cancel: function() {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_EDIT_CANCEL
        });
    },
    delete: function(bookId) {
        AppDispatcher.dispatch({
            actionType: BookConstants.BOOK_DELETE,
            bookId: bookId
        });
    }
};

var SearchPanel = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="one-fourth column">
                    Filter: &nbsp;
                    <input ref='search' type='text' value={this.props.search} onChange={this.onSearchChanged} />
                    {this.props.search?<button onClick={this.props.onClearSearch} >x</button>:null}
                </div>
            </div>
        )
    },
    onSearchChanged: function() {
        var query = React.findDOMNode(this.refs.search).value;
        this.props.onSearchChanged(query);
    }
});

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
        var self=this;
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
      this.setState(this.props.book);
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
        var query = React.findDOMNode(this.refs.search).value.trim();
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

var _state = {
    books: [],
    message:"",
    editingBook: null
}

var _props = {
    url: '/api/books/'
}

var _search = function(query) {
    $.ajax({
        url: _props.url+'?search='+query,
        dataType: 'json',
        cache: false,
        success: function(data) {
            _state.books = data;
            BookStore.emitChange();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
            BookStore.emitChange();
        }
    });
};

var _reloadBooks = function() {
    _search('');
};

var _deleteBook = function(bookId) {
    $.ajax({
        url: _props.url+bookId,
        method: 'DELETE',
        cache: false,
        success: function(data) {
            _state.message = "Successfully deleted book!"
            _clearEditingBook();
            _reloadBooks();
        },
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            _state.message = err.toString();
            BookStore.emitChange();
        }
    });
};

var _saveBook = function(book) {
    if(book.id) {
        $.ajax({
            url: _props.url+book.id,
            dataType: 'json',
            method: 'PUT',
            data:book,
            cache: false,
            success: function(data) {
                _state.message = "Successfully updated book!"
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message = err.toString()
                BookStore.emitChange();
            }
        });
    } else {
        $.ajax({
            url: _props.url,
            dataType: 'json',
            method: 'POST',
            data:book,
            cache: false,
            success: function(data) {
                _state.message = "Successfully added book!"
                _clearEditingBook();
                _reloadBooks();
            },
            error: function(xhr, status, err) {
                _state.message = err.toString()
                BookStore.emitChange();
            }
        });
    }
};

var _clearEditingBook = function() {
    _state.editingBook = null;
};

var _editBook = function(book) {
    _state.editingBook = book.id;
    BookStore.emitChange();
};

var _cancelEditBook = function(id) {
    _clearEditingBook();
    BookStore.emitChange();
};

var BookStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case BookConstants.BOOK_EDIT:
            _editBook(action.book);
        break;
        case BookConstants.BOOK_EDIT_CANCEL:
            _cancelEditBook();
        break;
        case BookConstants.BOOK_SAVE:
            _saveBook(action.book);
        break;
        case BookConstants.BOOK_SEARCH:
            _search(action.query);
        break;
        case BookConstants.BOOK_DELETE:
            _deleteBook(action.bookId);
        break;
    }
    return true;
});

_reloadBooks();

React.render(<BookPanel url='/api/books/' />, document.getElementById('content'));
