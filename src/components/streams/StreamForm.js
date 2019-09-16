import React from 'react';
import { Field, reduxForm } from 'redux-form';
//Field is a component, reduxForm is a function that serves as an identical purpose to connect function

class StreamForm extends React.Component {

    //warning: semantic ui automatically hides error messages (in this case the div)
    //need our form containing this div to have a class name of error (see render)
    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    //helper function for rendering inputs to feed to the Field component
    //calling renderInput will pass in properties as formProps, formProps.input provided by Redux Form automatically 
    renderInput = (formProps) => {
        const {label, input, meta} = formProps;

        //determines if we need to add error class name to div to mark it red
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return(
            /*
            <input onChange={formProps.input.onChange} value={formProps.input.value} />

            this is equivalent to the shorthand below, as well as other additional props
            */
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    //callback for our form, with this function going to ReduxForm's handleSubmit; automatically prevents default; formValues will contain the values of the input fields
    //calls the onSubmit callback passed as props from StreamCreate or StreamEdit parent component
    //make sure to make an arrow function since this call back is using 'this'!
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

//Redux Form will return an empty object if inputs were valid, will return an object with a key value pair on the object with name of invalid field and the error message
const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        //user did not enter a title
        errors.title = 'Please enter a title.';
    }
    if(!formValues.description){
        errors.description = "Please enter a description.";
    }

    return errors;
}

//reduxForm returns a function, and we immediately call that with StreamForm (StreamCreate before refactor); props get added to component after connecting reduxForm
//form (required) and validate(optional) are config properties passed in
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);