import React from 'react';
import ReactDOM from 'react-dom';
import { danger } from '../util/colors'

class DatePicker extends React.Component {
    render() {
        const { field, label } = this.props
        return(
            <div>
                <label forHtml={field.name}>{label}</label>
                <input type='text' ref='date' className="u-full-width" {...field} />
                {field.touched && field.error && <div style={{color: 'white', backgroundColor: danger}}>{field.error}</div>}
            </div>
        );
    }
    
    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.date)).datepicker({ dateFormat: 'yy-mm-dd' });
        $(ReactDOM.findDOMNode(this.refs.date)).on('change', this.handleChange.bind(this));
    }
    
    componentWillUnmount() {
    
    }
    
    handleChange(e) {
        e.preventDefault()
        let date = ReactDOM.findDOMNode(this.refs.date).value
        this.props.field.onChange(date);
    }
}

export default DatePicker
