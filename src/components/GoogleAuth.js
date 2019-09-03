//google auth that will be added to Header

import React from 'react';

class GoogleAuth extends React.Component {
    
    //need to load up gapi library once after component is mounted
    //just initializes library, does not take user to OAuth process
    //arrow function is a callback to invoke after done
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '530819572065-cib033liuvgqrelq1396u8ok3dte2nql.apps.googleusercontent.com',
                scope: 'email'
            });
        });
    }
    
    render() {
        return(
            <div>Google Auth</div>
        );
    }
}

export default GoogleAuth;