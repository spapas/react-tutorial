var React = require('react');
var MessageStore = require('../stores/MessageStore').MessageStore;

var MessagePanel = React.createClass({
    getInitialState: function() {
        return {
            
        };
    },
    render: function() {
        return(
            <div className="row">
                {this.state.message?<div className={this.state.message.color}>{this.state.message.text}</div>:""}
            </div>
        );
    },
    _onChange: function() {
        this.setState(MessageStore.getState());
    },
    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        MessageStore.addChangeListener(this._onChange);
    }
})


module.exports.MessagePanel = MessagePanel;