var React = require('react');

var DatePicker = React.createClass({
    render: function() {
        return(
            <input type='text' ref='date' value={this.props.value} onChange={this.handleChange} />
        );
    },
    componentDidMount: function() {
        $(React.findDOMNode(this)).datepicker({ dateFormat: 'yy-mm-dd' });
        $(React.findDOMNode(this)).on('change', this.handleChange);
    },
    componentWillUnmount: function() {
    
    },
    handleChange: function() {
        var date = React.findDOMNode(this.refs.date).value
        this.props.onChange(date);
    }
});

module.exports.DatePicker = DatePicker ;

