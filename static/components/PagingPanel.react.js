var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;

var PagingPanel = React.createClass({
    render: function() {
        return(
            <div className="row">
                {this.props.page==1?'':<button onClick={this.onPreviousPageClick}>&lt;</button>}
                Page {this.props.page} of {this.getTotalPages()}
                {this.props.page==this.getTotalPages()?'':<button onClick={this.onNextPageClick} >&gt;</button>}
            </div>
        );
    },
    onNextPageClick: function(e) {
        e.preventDefault();
        BookActions.change_page(this.props.page+1)
    },
    onPreviousPageClick: function(e) {
        e.preventDefault();
        BookActions.change_page(this.props.page-1)
    },
    getTotalPages: function() {
        return Math.ceil(this.props.total / this.props.page_size);
    }
})


module.exports.PagingPanel = PagingPanel;