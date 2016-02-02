import React from 'react'

import { loadBooks, loadAuthors, loadBookAction, showSuccessNotification, 
    showErrorNotification, loadCategories, loadSubCategories
} from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'
import DatePicker from './Datepicker.react'
import Input from './Input.react'
import { danger } from '../util/colors'

const submit = (id, values, dispatch) => {
    console.log(values)
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
            
            dispatch(showSuccessNotification('Success!'))
            dispatch(routeActions.push('/'));

        },
        error: (d) => {
            //dispatch(submittingChangedAction(false))
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
            dispatch(loadBooks())
            dispatch(showSuccessNotification('Success!'))
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
    return errors;
}


class BookForm extends React.Component {

    render() {
        const {fields: {
            title, category, subcategory, publish_date, author
        }, handleSubmit, dispatch } = this.props;
        const { id } = this.props.params;
        const { categories, subcategories } = this.props.categories;
        const authors = this.props.authors.rows;
        
        const tsubmit = submit.bind(undefined,id);
        const dsubmit = del.bind(undefined,id, dispatch);

        return <form   onSubmit={handleSubmit(tsubmit) }>
            
            <div className='row'>
                <div className='six columns'>
                    <Input label='Title' field={title} />
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
            
            <div className='row'>
                <div className='six columns'>
                    <label forHtml='publish_date'>Publish Date</label>
                    <DatePicker className="u-full-width" {...publish_date} />
                </div>
                <div className='six columns'>
                    <label forHtml='author'>Author</label>
                    <select type='text' className="u-full-width" {...author} >
                        <option></option>
                        {authors.map(a => <option value={a.id} key={a.id} >{a.last_name} {a.first_name}</option>)}
                    </select>
                </div>
            </div>
            
            <button className='button button-primary' onClick={handleSubmit(tsubmit)}>
                Save
            </button> 
            {id?<button className='button button-primary' style={{backgroundColor: danger}} onClick={dsubmit}>
                Delete
            </button>:null}

        </form>
    }
    
    componentDidMount() {
        if(this.props.categories.categories.length==0) {
            this.props.dispatch(loadCategories());
        }
        
        if(this.props.authors.rows.length==0) {
            this.props.dispatch(loadAuthors());
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
        categories:state.categories,
        authors:state.authors,
        initialValues:initial,
    }
};

const BookFormContainer = reduxForm({
    form: 'bookForm',
    fields: ['title', 'category', 'subcategory', 'publish_date', 'author' ],
    validate
}, mapStateToProps)(BookForm);


export default BookFormContainer;
