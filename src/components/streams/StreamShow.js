import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    //call our fetchStream action creator, get id from url
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
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