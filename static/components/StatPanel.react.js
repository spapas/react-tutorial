var React = require('react');
var CategoryNumberStore = require('../stores/CategoryNumberStore').CategoryNumberStore;

var StatPanel = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <div className="row">
                <div className="one-half column">
                    Books in category: {this.state.category_books}
                </div>
                <div className="one-half column">
                    Books in subcategory: {this.state.subcategory_books}
                </div>
                <br />
            </div>
        );
    },
    _onChange: function() {
        this.setState(CategoryNumberStore.getState());
    },
    componentWillUnmount: function() {
        CategoryNumberStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        CategoryNumberStore.addChangeListener(this._onChange);
    }
});

module.exports.StatPanel = StatPanel ;

