var React = require('react');
var DropDown = require('./DropDown.react').DropDown;
var AuthorDialog = require('./AuthorDialog.react').AuthorDialog;
var AuthorActions = require('../actions/AuthorActions').AuthorActions;

var AuthorPanel = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var authorExists = false ;
        if(this.props.authors) {
            var ids = this.props.authors.map(function(x) {
                return x.id*1;
            });
            
            if(ids.indexOf(1*this.props.author)>=0 ) {
                authorExists = true;
            }
        }
        
        return(
            <div className='one-half column'>
                <AuthorDialog showDialog={this.props.showDialog} />
                <label forHtml='date'>Author</label>
                <DropDown options={this.props.authors} dropDownValueChanged={this.props.onAuthorChanged} value={authorExists?this.props.author:''} />
                <button onClick={this.addAuthor} >+</button>
                {authorExists?<button onClick={this.deleteAuthor}>-</button>:""}
            </div>
        );
    },
    addAuthor: function(e) {
        e.preventDefault();
        console.log("ADD AUTHOR");
        AuthorActions.show_add_author();
    },
    deleteAuthor: function(e) {
        e.preventDefault();
        AuthorActions.delete_author(this.props.author);
        console.log("DELETE AUTHOR");
        console.log(this.props.author);
    },
});

module.exports.AuthorPanel = AuthorPanel;

