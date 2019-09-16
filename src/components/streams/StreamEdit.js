import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    render(){
        if(!this.props.stream){
            return(
                <div>Loading...</div>
            );
        }
        return (
            <div>
                <div>{this.props.stream.title}</div>
                <div>{this.props.stream.description}</div>
            </div>
        );
    }
};

//ownProps is a reference to props being passed in to StreamEdit functional component
//find the stream that matches the id from our store
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);