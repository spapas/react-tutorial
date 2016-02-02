import React from 'react'

import { 
    loadAuthors, loadAuthorAction, showSuccessNotification, showErrorNotification
} from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'
import Input from './Input.react'
import { danger } from '../util/colors'

const submit = (id, values, dispatch) => {
    let url = '//127.0.0.1:8000/api/authors/'
    let type = 'POST'

    if(id) {
        url = `//127.0.0.1:8000/api/authors/${id}/`
        type = 'PUT'
    }
    
    $.ajax({
        type,
        url,
        data: values,
        success: (d) => {
            
            // TODO: This returns the modified object - should be used instead of "reloading"
            //dispatch(submittingChangedAction(false))
            dispatch(loadAuthors())
            dispatch(showSuccessNotification('Success!'))
            dispatch(routeActions.push('/authors/'));

        },
        error: (d) => {
            //dispatch(submittingChangedAction(false))
            console.log(d);
            dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
        }
    });
};


const del = (id, dispatch) => {
    const url = `//127.0.0.1:8000/api/authors/${id}/`
    const type='DELETE';
    $.ajax({
        type,
        url,
        success: (d) => {
            dispatch(loadAuthors())
            dispatch(showSuccessNotification('Success!'))
            dispatch(routeActions.push('/authors/'));

        },
        error: (d) => {
            dispatch(showErrorNotification(`Error (${d.status} - ${d.statusText}) while saving: ${d.responseText}` ))
        }
    });
};

const validate = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'Required';
    }
    if (!values.last_name) {
        errors.last_name = 'Required';
    }
    return errors;
}


class AuthorForm extends React.Component {

    render() {
        const {fields: {
            first_name, last_name
        }, handleSubmit, dispatch } = this.props;
        const { id } = this.props.params;
        
        const tsubmit = submit.bind(undefined,id);
        const dsubmit = del.bind(undefined,id, dispatch);

        return <form   onSubmit={handleSubmit(tsubmit) }>
            <div className='row'>
                <div className='six columns'>
                    <Input label='Last Name' field={last_name} />
                </div>
            
                <div className='six columns'>
                    <Input label='First Name' field={first_name} />
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
        if (this.props.params.id) {
            if(!this.props.author || this.props.author.id != this.props.params.id) {
                this.props.dispatch(loadAuthorAction(this.props.params.id));
            }
        } else {
            // New author 
        }
    }
};


const mapStateToProps = (state, props) => {
    let initial = {}
    const { author } = state.authors

    if(props.params.id && author) {
        initial = author
    }
    
    return {
        author:state.authors.author,
        initialValues:initial,
    }
};

const AuthorFormContainer = reduxForm({
    form: 'authorForm',
    fields: ['first_name', 'last_name' ],
    validate
}, mapStateToProps)(AuthorForm);


export default AuthorFormContainer;
