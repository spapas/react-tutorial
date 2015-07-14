var React = require('react');
var BookPanel = require('./components/BookPanel.react').BookPanel;

React.render(<BookPanel url='/api/books/' />, document.getElementById('content'));

