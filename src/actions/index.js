//action creators will be called after successful log in/out through gapi library
import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//action to create stream, this is called with a list of different values (formValues from StreamCreate) we enter to our form from StreamCreate as an argument
//streams from db.json will do a POST with these arguments
export const createStream = formValues => async dispatch => {
    streams.post('/streams', formValues);
};