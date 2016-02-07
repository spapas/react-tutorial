import React from 'react';
import ReactDOM from 'react-dom';


export default class SearchPanel extends React.Component {
    constructor() {
        super()
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onClearSearch = this.onClearSearch.bind(this)
        
        this.state = {}
    }
    
    render() {

        return (
            <div className="row">
                <div className="one-fourth column">
                    Filter: &nbsp;
                    <input ref='search' name='search' type='text' defaultValue={this.props.search} value={this.state.search} onChange={this.onSearchChange } />
                    {(this.state.search||this.props.search)?<button onClick={this.onClearSearch} >x</button>:''}
                </div>
            </div>
        )
    }
    
    onSearchChange() {
        var query = ReactDOM.findDOMNode(this.refs.search).value;
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            search: query
        });
        this.promise = setTimeout(function () {
            
            this.props.onSearchChanged(query) 
            
        }.bind(this), 400);
    }
    
    onClearSearch() {
        this.setState({
            search: ''
        });
        this.props.onSearchChanged(undefined) 
        
    }
}



