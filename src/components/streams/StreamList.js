import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
    
    //call our action creator on mount
    componentDidMount(){
        this.props.fetchStreams();
    }
    
    //helper function to compare stream's userIDd with currentUserId
    renderAdmin(stream){
        if(stream.userId === this.props.currentUserId){
            return(
                <div className="right floated content">
                    <button className="ui button primary">
                        Edit
                    </button>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            );
        }
    }

    //for each stream, render it out on the StreamList page
    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
};

//Object.values takes an object and pulls out the values to be inserted into an array, turn our store's streams into props
const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);