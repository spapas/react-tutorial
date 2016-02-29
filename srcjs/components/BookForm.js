import React from 'react'

import { addBookResult, updateBookResult, deleteBookResult, loadBook, showSuccessNotification, 
    showErrorNotification, loadCategories, loadSubCategories, submittingChanged
} from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'
import DatePicker from './DatePicker'
import Input from './Input'
import Select from './Select'
import { danger } from '../util/colors'

const submit = (id, values, dispatch) => {
    let url = '//127.0.0.1:8000/api/books/'
    let type = 'POST'

    if(id) {
        url = `//127.0.0.1:8000/api/books/${id}/`
        type = 'PUT'
    }
    
    dispatch(submittingChanged(true))
    
    $.ajax({
        type,
        url,
        data: values,
        success: (d) => {
            dispatch(submittingChanged(false))
            dispatch(showSuccessNotification('Success!'))
            if(id) {
                dispatch(updateBookResult(d))
            } else {
                dispatch(addBookResult(d))
            }
            dispatch(routeActions.push('/'));

        },
        error: (d) => {
            dispatch(submittingChanged(false))
            console.log(d);
            dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
        }
    });
};

const del = (id, dispatch) => {
    const url = `//127.0.0.1:8000/api/books/${id}/`
    const type='DELETE';
    $.ajax({
        type,
        url,
        success: (d) => {
            
            dispatch(showSuccessNotification('Success!'))
            dispatch(deleteBookResult(id))
            dispatch(routeActions.push('/'));

        },
        error: (d) => {
            dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
        }
    });
};

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    if(values.publish_date) {
        const re = /^\d{4}-\d{2}-\d{2}$/;  
        if(!re.exec(values.publish_date)) {
            errors.publish_date = 'Invalid';
        }
    }
    return errors;
}


class BookForm extends React.Component {

    render() {
        const {fields: {
            title, category, subcategory, publish_date, author
        }, handleSubmit, dispatch } = this.props;
        const { id } = this.props.params;
        const { isSubmitting } = this.props.ui;
        const { categories, subcategories } = this.props.categories;
        const authors = this.props.authors.rows;
        
        const tsubmit = submit.bind(undefined,id);
        const dsubmit = del.bind(undefined,id, dispatch);

        return <form onSubmit={handleSubmit(tsubmit)}>
            
            <div className='row'>
                <div className='six columns'>
                    <Input label='Title' field={title} />
                </div>
            </div>
            <div className='row'>
                <div className='six columns'>
                    <Select label='Category' field={category} options={categories} onChange={ event => {
                        category.onChange(event);
                        dispatch(loadSubCategories(event.target.value))
                    }}/>
                </div>
                <div className='six columns'>
                    <Select label='Subcategory' field={subcategory} options={subcategories} />
                </div>
            </div>
            <div className='row'>
                <div className='six columns'>
                    <DatePicker className="u-full-width" label='Publish Date' field={publish_date} />
                </div>
                <div className='six columns'>
                    <Select label='Author' field={author} options={
                        authors.map(a => ({'id': a.id, 'name': `${a.first_name} ${a.last_name}`}))
                    } />
                </div>
            </div>
            <button disabled={isSubmitting} className='button button-primary' onClick={handleSubmit(tsubmit)}>
                Save
            </button> 
            {id?<button disabled={isSubmitting} type='button' className='button button-primary' style={{backgroundColor: danger}} onClick={dsubmit}>
                Delete
            </button>:null}
        </form>
    }
    
    componentDidMount() {
        if(this.props.categories.categories.length==0) {
            this.props.dispatch(loadCategories());
        }
        
        if (this.props.params.id) {
            if(!this.props.book || this.props.book.id != this.props.params.id) {
                this.props.dispatch(loadBook(this.props.params.id));
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
        book: state.books.book,
        categories: state.categories,
        authors: state.authors,
		ui: state.ui,
        initialValues: initial,
    }
};

export default reduxForm({
    form: 'bookForm',
    fields: ['title', 'category', 'subcategory', 'publish_date', 'author' ],
    validate
}, mapStateToProps)(BookForm);



