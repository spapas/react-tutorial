import React from 'react'

import { loadAuthors, loadAuthorAction, showSuccessNotification, showErrorNotification
} from '../actions'
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux'

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


class AuthorForm extends React.Component {

    render() {
        const {fields: {
            first_name, last_name
        }, handleSubmit, dispatch } = this.props;
        const { id } = this.props.params;
        const { isLoading } = this.props.ui;
        
        const tsubmit = submit.bind(undefined,id);

        return <form   onSubmit={handleSubmit(tsubmit) }>
            {isLoading?<div className="loading">Loading&#8230;</div>:null}
            <div className='row'>
                <div className='six columns'>
                    <label forHtml='last_name'>Last name</label>
                    <input type='text' className="u-full-width" {...last_name} />
                </div>
            
                <div className='six columns'>
                    <label forHtml='first_name'>First name</label>
                    <input type='text' className="u-full-width" {...first_name} />
                </div>
            </div>
            
            <button className='btn btn-primary' onClick={handleSubmit(tsubmit)}>
                Αποθήκευση
            </button>

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
        ui:state.ui,
        initialValues:initial,
    }
};

const AuthorFormContainer = reduxForm({
    form: 'authorForm',
    fields: ['first_name', 'last_name' ]
}, mapStateToProps)(AuthorForm);


export default AuthorFormContainer;
