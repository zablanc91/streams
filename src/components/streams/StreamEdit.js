import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    //call our fetchStream action creator, props.match.params.id is from Route parent components; gets you the specific stream
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    //callback for StreamForm, similar to StreamCreate; call editStream
    //editStream = (id, formValues)
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    //we will pass on initialValues props to stream form, this is an object with the title and description of our stream (these keys match the names of the Forms on StreamForm)
    render(){
        if(!this.props.stream){
            return(
                <div>Loading...</div>
            );
        }

        const {title, description} = this.props.stream;
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    onSubmit={this.onSubmit}
                    initialValues={{ title: title, description: description }}
                 />
            </div>
        );
    }
};

//ownProps is a reference to props being passed in to StreamEdit component from Route (see app.js)
//find the stream that matches the id from our store
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { 
    fetchStream, editStream 
    })(StreamEdit);