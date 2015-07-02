var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;

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

module.exports.BookForm = BookForm;