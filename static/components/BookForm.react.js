var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;
var DropDown = require('./DropDown.react.js').DropDown;
var StatPanel = require('./StatPanel.react.js').StatPanel;
var MessagePanel = require('./MessagePanel.react.js').MessagePanel;
var DatePicker = require('./DatePicker.react.js').DatePicker;
var ButtonPanel = require('./ButtonPanel.react.js').ButtonPanel;
var AuthorPanel = require('./AuthorPanel.react.js').AuthorPanel;
var CategoryStore = require('../stores/CategoryStore').CategoryStore;
var AuthorStore = require('../stores/AuthorStore').AuthorStore;
var loadCategories = require('../stores/CategoryStore').loadCategories;
var loadAuthors = require('../stores/AuthorStore').loadAuthors;


var BookForm = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='title'>Title</label>
                        <input ref='title' name='title' type='text' value={this.props.book.title} onChange={this.onTitleChange} />
                    </div>
                    <div className='one-half column'>
                        <label forHtml='date'>Publish date</label>
                        <DatePicker ref='date' onChange={this.onDateChange} value={this.props.book.publish_date} />
                    </div>
                </div>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='category'>Category</label>
                        <DropDown options={this.state.categories} dropDownValueChanged={this.onCategoryChanged} value={this.props.book.category} />
                        <DropDown options={this.state.subcategories} dropDownValueChanged={this.onSubCategoryChanged} value={this.props.book.subcategory} />
                    </div>
                    <AuthorPanel authors={this.state.authors} author={this.props.book.author} onAuthorChanged={this.onAuthorChanged} showDialog={this.state.showDialog} />
                </div>
                
                <ButtonPanel book={this.props.book}  />
                <MessagePanel />
                <StatPanel  />
            </form>
        );
    },
    onSubmit: function(e) {
        e.preventDefault();
        BookActions.save(this.props.book)
    },
    onTitleChange: function() {
        this.props.book.title = React.findDOMNode(this.refs.title).value;
        BookActions.change_book(this.props.book);
    },
    onDateChange: function(date) {
        this.props.book.publish_date = date;
        BookActions.change_book(this.props.book);
    },
    onCategoryChanged: function(cat) {
        this.props.book.category = cat;
        this.props.book.subcategory = '';
        BookActions.change_book(this.props.book);
    },
    onSubCategoryChanged: function(cat) {
        this.props.book.subcategory = cat;
        BookActions.change_book(this.props.book);
    },
    onAuthorChanged: function(author) {
        this.props.book.author = author;
        BookActions.change_book(this.props.book);
    },
    _onChangeCategories: function() {
        this.setState(CategoryStore.getState());
    },
    _onChangeAuthors: function() {
        this.setState(AuthorStore.getState());
    },
    componentWillUnmount: function() {
        CategoryStore.removeChangeListener(this._onChangeCategories);
        AuthorStore.removeChangeListener(this._onChangeAuthors);
    },
    componentDidMount: function() {
        CategoryStore.addChangeListener(this._onChangeCategories);
        AuthorStore.addChangeListener(this._onChangeAuthors);
        loadCategories();
        loadAuthors();
    }
});


module.exports.BookForm = BookForm;