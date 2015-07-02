var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;

var SearchPanel = React.createClass({
    getInitialState: function() {
        return {
            search: '',
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="one-fourth column">
                    Filter: &nbsp;
                    <input ref='search' name='search' type='text' value={this.state.search} onChange={this.onSearchChange} />
                    {this.state.search?<button onClick={this.onClearSearch} >x</button>:''}
                </div>
            </div>
        )
    },
    onSearchChange: function() {
        var query = React.findDOMNode(this.refs.search).value;
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            search: query
        });
        this.promise = setTimeout(function () {
            BookActions.search(query);
        }.bind(this), 200);
    },
    onClearSearch: function() {
        this.setState({
            search: ''
        });
        BookActions.search('');
    }
});

module.exports.SearchPanel = SearchPanel;