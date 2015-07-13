var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;
var DropDown = require('./DropDown.react.js').DropDown;

var BookForm = React.createClass({
    getInitialState: function() {
        if (this.props.book) {
            return this.props.book;
        } else {
            return {};
        }
    },
    componentWillReceiveProps: function(props) {
        if(props.continueEditing) {
            if(this.state) {
                this.setState(this.state);
            }
        } else {
            if(props.book) {
                this.setState(props.book);
            } else {
                this.replaceState({
                    category: null,
                    subcategory: null,
                });
            }
        } 
    },
    render: function() {
        return(
            <form onSubmit={this.onSubmit}>
                <label forHtml='title'>Title</label><input ref='title' name='title' type='text' value={this.state.title} onChange={this.onFormChange} />
                <label forHtml='category'>Category</label>
                <DropDown options={this.props.categories} dropDownValueChanged={this.onCategoryChanged} value={this.state.category} />
                <DropDown options={this.props.subcategories} dropDownValueChanged={this.onSubCategoryChanged} value={this.state.subcategory} />
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
            title: React.findDOMNode(this.refs.title).value
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
    },
    onCategoryChanged: function(cat) {
        BookActions.change_category(cat)
        this.setState({
            category: cat,
            subcategory: ''
        })
    },
    onSubCategoryChanged: function(cat) {
        this.setState({
            subcategory: cat
        })
    }
});

module.exports.BookForm = BookForm;