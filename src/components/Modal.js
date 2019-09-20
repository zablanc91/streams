import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    //arguments to createPortal: jsx to display, and container element
    //first div to exit out when clicking outside modal
    //one lower to prevent event bubbling up and closing modal when clicking button
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={props.onDismiss} >
            <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation() }>
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;