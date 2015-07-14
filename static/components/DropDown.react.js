var React = require('react');

var DropDown = React.createClass({
    render: function() {
        var options = [];
        options.push(<option key='-1' value='' >---</option>);
        if(this.props.options) {
            this.props.options.forEach(function(option) {
                options.push(<option key={option.id} value={option.id}>{option.name}</option>);
            });
        }
        
        return(
            <select ref='dropdown' value={this.props.value?this.props.value:''} onChange={this.onFormChange} >
                {options}
            </select>
        );
    },
    onFormChange: function() {
        var val = React.findDOMNode(this.refs.dropdown).value
        this.props.dropDownValueChanged(val);
    }
});

module.exports.DropDown = DropDown;