import React from 'react';
import ReactDOM from 'react-dom';

class DatePicker extends React.Component {
    render() {
        return(
            <input type='text' ref='date' {...this.props} />
        );
    }
    
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).datepicker({ dateFormat: 'yy-mm-dd' });
        $(ReactDOM.findDOMNode(this)).on('change', this.handleChange.bind(this));
    }
    
    componentWillUnmount() {
    
    }
    
    handleChange(e) {
        e.preventDefault()
        let date = ReactDOM.findDOMNode(this.refs.date).value
        this.props.onChange(date);
    }
}


export default DatePicker
