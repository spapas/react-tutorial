var React = require('react');
var BookPanel = require('./components/BookPanel.react').BookPanel;
var reloadBooks = require('./stores/BookStore').reloadBooks;
var loadCategories = require('./stores/BookStore').loadCategories;


React.render(<BookPanel url='/api/books/' />, document.getElementById('content'));

reloadBooks();
loadCategories();
