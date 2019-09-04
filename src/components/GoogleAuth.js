//google auth that will be added to Header

import React from 'react';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };

    //need to load up gapi library once after component is mounted
    //just initializes library, does not take user to OAuth process
    //arrow function is a callback to invoke after done loading
    //note: client.init is an asynch network request to google's API server, returns a promise to do callback after init is done
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '530819572065-cib033liuvgqrelq1396u8ok3dte2nql.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {

                //initialize the component's auth object
                this.auth = window.gapi.auth2.getAuthInstance();
                //set current authentication status after library is initialized instead of null
                this.setState({isSignedIn: this.auth.isSignedIn.get()})

                //event listener for signing in/out
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    //helper function to dynamically update sign in status
    //because this is used as callback function from this.auth.isSignedIn.isten, will need to make arrow function to bind this
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()});
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    //helper function to display sign in status
    //changes status on click
    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null;
        }
        else if(this.state.isSignedIn){
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else{
            return(
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }
    
    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default GoogleAuth;