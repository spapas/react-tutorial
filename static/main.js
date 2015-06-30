var React = require('react');
var components = require('./components');
var stores = require('./stores');

React.render(<components.BookPanel url='/api/books/' />, document.getElementById('content'));

stores.reloadBooks();