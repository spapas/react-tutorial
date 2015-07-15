var React = require('react');
var AuthorActions = require('../actions/AuthorActions').AuthorActions;

var AuthorDialog = React.createClass({
    
    render: function() {
        if (!this.props.showDialog) {
            return (
                <div />
            )
        } else {
            return(
                <div className='modal-dialog' id="dialog-form"  >
                    <label htmlFor="first_name">First name:</label> <input type='text' ref='first_name' name='first_name' /> <br />
                    <label htmlFor="last_name">Last name:</label> <input type='text' ref='last_name' name='last_name' /> <br />
                    <button onClick={this.onOk}>Ok</button>
                    <button onClick={this.onCancel} >Cancel</button>
                </div>
                
            );
        }
    },
    componentDidMount: function() {
        
    },
    componentWillUnmount: function() {
    
    },
    onCancel: function(e) {
        e.preventDefault();
        AuthorActions.hide_add_author();
    },
    onOk: function(e) {
        e.preventDefault();
        first_name = React.findDOMNode(this.refs.first_name).value;
        last_name = React.findDOMNode(this.refs.last_name).value;
        AuthorActions.add_author_ok({
            first_name: first_name,
            last_name: last_name
        });
    }
});

module.exports.AuthorDialog = AuthorDialog ;

