import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    //call our fetchStream action creator, props.match.params.id is from Route parent components; gets you the specific stream
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    //helper to render buttons for delete stream modal
    //a div wrapping the buttons causes spacing to render strangely, use Fragment since it produces no effects on DOM
    renderActions(){
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={() => this.props.deleteStream(id) }>
                    Delete
                </button>
                <Link className="ui button" to="/" >
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    //renders first statement if componentDidMount has not yet finished getting our stream
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?';
        }

        return `Are you sure you want to delete ${this.props.stream.title}?`;
    }

    render(){
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
};

//need to pull streams from Redux store (index.js reducers) and then get our specific stream with ownProps
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);