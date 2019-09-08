import React from 'react';
import { Field, reduxForm } from 'redux-form';
//Field is a component, reduxForm is a function that serves as an identical purpose to connect function

class StreamCreate extends React.Component {
    //helper function for rendering inputs to feed to the Field component
    //calling renderInput will pass in properties as formProps, formProps.input provided by Redux Form automatically 
    renderInput(formProps) {
        console.log(formProps.meta);
        return(
            /*
            <input onChange={formProps.input.onChange} value={formProps.input.value} />

            this is equivalent to the shorthand below, as well as other additional props
            */
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} />
                <div>{formProps.meta.error}</div>
            </div>
        );
    }

    //callback for our form, with this function going to ReduxForm's handleSubmit; automatically prevents default; formValues will contain the values of the input fields
    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)} >
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

//reduxForm returns a function, and we immediately call that with StreamCreate; props get added to component after connecting reduxForm
export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);