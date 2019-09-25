import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    //use Ref system to access DOM elements
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    //call our fetchStream action creator, get id from url
    //create flv player and feed it to our video element
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    //calls buildPlayer in the case that we don't have access to the stream after componentDidMount gets called
    componentDidUpdate(){
        this.buildPlayer();
    }

    //clean up the video player after streaming ends, detach itself from video element in render
    componentWillMount(){
        this.player.destroy();
    }

    //helper method that creates flv player and feeds it to our video element
    //only do so when there already isn't a player and when the stream is available
    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }
        const { id } = this.props.match.params;
        this.player =  flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    
    render(){
        if(!this.props.stream){
            return(
                <div>
                    Loading...
                </div>
            );
        }

        const {title, description} = this.props.stream;
        return(
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls={true} />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

//again, ownProps are props from the Route passed to StreamShow (App.js)
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);