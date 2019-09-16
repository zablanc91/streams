import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    //callback for the child StreamForm, with this function going to the child's ReduxForm's handleSubmit; automatically prevents default; formValues will contain the values of the input fields
    //calls the createStream action creator
    //make sure to make an arrow function since this call back is using 'this'!
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

//connect our createStream action creator
export default connect(null, {
    createStream
})(StreamCreate);