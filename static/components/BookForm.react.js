var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;
var CategoryActions = require('../actions/CategoryActions').CategoryActions;
var DropDown = require('./DropDown.react.js').DropDown;
var StatPanel = require('./StatPanel.react.js').StatPanel;
var DatePicker = require('./DatePicker.react.js').DatePicker;
var ButtonPanel = require('./ButtonPanel.react.js').ButtonPanel;
var BookStore = require('../stores/BookStore').BookStore;
var CategoryStore = require('../stores/CategoryStore').CategoryStore;
var loadCategories = require('../stores/CategoryStore').loadCategories;


var BookForm = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='title'>Title</label><input ref='title' name='title' type='text' value={this.props.book.title} onChange={this.onTitleChange} />
                    </div>
                    <div className='one-half column'>
                        <label forHtml='date'>Publish date</label><DatePicker ref='date' onChange={this.onDateChange} value={this.props.book.publish_date} />
                    </div>
                </div>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='category'>Category</label>
                        <DropDown options={this.state.categories} dropDownValueChanged={this.onCategoryChanged} value={this.props.book.category} />
                        <DropDown options={this.state.subcategories} dropDownValueChanged={this.onSubCategoryChanged} value={this.props.book.subcategory} />
                    </div>
                </div>
                
                <ButtonPanel book={this.props.book} message={this.props.message} />
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
        BookActions.change_book(this.props.book);
        CategoryActions.change_category(cat)
    },
    onSubCategoryChanged: function(cat) {
        this.props.book.subcategory = cat;
        BookActions.change_book(this.props.book);
        CategoryActions.change_subcategory(cat)
    },
    _onChange: function() {
        this.setState(CategoryStore.getState());
    },
    componentWillUnmount: function() {
        CategoryStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        CategoryStore.addChangeListener(this._onChange);
        loadCategories();
    }
});


module.exports.BookForm = BookForm;