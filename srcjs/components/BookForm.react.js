import React from 'react'

import { loadBooks, loadBookAction, showSuccessNotification, 
    showErrorNotification, loadCategories, loadSubCategories
} from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'


const submit = (id, values, dispatch) => {

    let url = '//127.0.0.1:8000/api/books/'
    let type = 'POST'

    if(id) {
        url = `//127.0.0.1:8000/api/books/${id}/`
        type = 'PUT'
    }
    
    $.ajax({
        type,
        url,
        data: values,
        success: (d) => {
            
            // TODO: This returns the modified object - should be used instead of "reloading"
            //dispatch(submittingChangedAction(false))
            dispatch(loadBooks())
            
            dispatch(showSuccessNotification('Επιτυχής αποθήκευση!'))
            dispatch(routeActions.push('/'));

        },
        error: (d) => {
            //dispatch(submittingChangedAction(false))
            console.log(d);
            dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
        }
    });
    
    
};


class BookForm extends React.Component {

    render() {
        const {fields: {
            title, category, subcategory
        }, handleSubmit, dispatch } = this.props;
        const { id } = this.props.params;
        const { isLoading } = this.props.ui;
        const { categories, subcategories } = this.props.categories;
        
        const tsubmit = submit.bind(undefined,id);

        return <form   onSubmit={handleSubmit(tsubmit) }>
            {isLoading?<div className="loading">Loading&#8230;</div>:null}
            <div className='row'>
                <div className='six columns'>
                    <label forHtml='title'>Title</label>
                    <input type='text' className="u-full-width" {...title} />
                </div>
            </div>
            <div className='row'>
                <div className='six columns'>
                    <label forHtml='category'>Category</label>
                    <select type='text' className="u-full-width" {...category} onChange={ event => {
                        category.onChange(event);
                        dispatch(loadSubCategories(event.target.value))
                    }}>
                        <option></option>
                        {categories.map(c => <option value={c.id} key={c.id} >{c.name}</option>)}
                    </select>
                </div>
                <div className='six columns'>
                    <label forHtml='subcategory'>Subcategory</label>
                    <select type='text' className="u-full-width" {...subcategory} >
                        <option></option>
                        {subcategories.map(c => <option value={c.id} key={c.id} >{c.name}</option>)}
                    </select>
                </div>
            </div>
            
            <button className='btn btn-primary' onClick={handleSubmit(tsubmit)}>
                Αποθήκευση
            </button>

        </form>
    }
    
    componentDidMount() {
        
        if(this.props.categories.categories.length==0) {
            this.props.dispatch(loadCategories());
        }
        
        if (this.props.params.id) {
            if(!this.props.book || this.props.book.id != this.props.params.id) {
                
                this.props.dispatch(loadBookAction(this.props.params.id));
            }
        } else {
            // New book 
        }
    }
};


const mapStateToProps = (state, props) => {
    let initial = {}
    const { book } = state.books

    if(props.params.id && book) {
        initial = book
    }
    
    return {
        book:state.books.book,
        ui:state.ui,
        categories:state.categories,
        initialValues:initial,
    }
};

const BookFormContainer = reduxForm({
    form: 'bookForm',
    fields: ['title', 'category', 'subcategory' ]
}, mapStateToProps)(BookForm);


export default BookFormContainer;
/*

var React = require('react');
var BookActions = require('../actions/BookActions').BookActions;
var DropDown = require('./DropDown.react.js').DropDown;
var StatPanel = require('./StatPanel.react.js').StatPanel;
var MessagePanel = require('./MessagePanel.react.js').MessagePanel;
var DatePicker = require('./DatePicker.react.js').DatePicker;
var ButtonPanel = require('./ButtonPanel.react.js').ButtonPanel;
var AuthorPanel = require('./AuthorPanel.react.js').AuthorPanel;
var CategoryStore = require('../stores/CategoryStore').CategoryStore;
var AuthorStore = require('../stores/AuthorStore').AuthorStore;
var loadCategories = require('../stores/CategoryStore').loadCategories;
var loadAuthors = require('../stores/AuthorStore').loadAuthors;


var BookForm = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='title'>Title</label>
                        <input ref='title' name='title' type='text' value={this.props.book.title} onChange={this.onTitleChange} />
                    </div>
                    <div className='one-half column'>
                        <label forHtml='date'>Publish date</label>
                        <DatePicker ref='date' onChange={this.onDateChange} value={this.props.book.publish_date} />
                    </div>
                </div>
                <div className='row'>
                    <div className='one-half column'>
                        <label forHtml='category'>Category</label>
                        <DropDown options={this.state.categories} dropDownValueChanged={this.onCategoryChanged} value={this.props.book.category} />
                        <DropDown options={this.state.subcategories} dropDownValueChanged={this.onSubCategoryChanged} value={this.props.book.subcategory} />
                    </div>
                    <AuthorPanel authors={this.state.authors} author={this.props.book.author} onAuthorChanged={this.onAuthorChanged} showDialog={this.state.showDialog} />
                </div>
                
                <ButtonPanel book={this.props.book}  />
                <MessagePanel />
                <StatPanel  />
            </form>
        );
    },
    onSubmit: function(e) {
        e.preventDefault();
        BookActions.save(this.props.book)
    },
    onTitleChange: function() {
        this.props.book.title = React.findDOMNode(this.refs.title).value;
        BookActions.change_book(this.props.book);
    },
    onDateChange: function(date) {
        this.props.book.publish_date = date;
        BookActions.change_book(this.props.book);
    },
    onCategoryChanged: function(cat) {
        this.props.book.category = cat;
        this.props.book.subcategory = '';
        BookActions.change_book(this.props.book);
    },
    onSubCategoryChanged: function(cat) {
        this.props.book.subcategory = cat;
        BookActions.change_book(this.props.book);
    },
    onAuthorChanged: function(author) {
        this.props.book.author = author;
        BookActions.change_book(this.props.book);
    },
    _onChangeCategories: function() {
        this.setState(CategoryStore.getState());
    },
    _onChangeAuthors: function() {
        this.setState(AuthorStore.getState());
    },
    componentWillUnmount: function() {
        CategoryStore.removeChangeListener(this._onChangeCategories);
        AuthorStore.removeChangeListener(this._onChangeAuthors);
    },
    componentDidMount: function() {
        CategoryStore.addChangeListener(this._onChangeCategories);
        AuthorStore.addChangeListener(this._onChangeAuthors);
        loadCategories();
        loadAuthors();
    }
});


module.exports.BookForm = BookForm;
*/