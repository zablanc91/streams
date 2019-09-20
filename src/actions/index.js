//action creators will be called after successful log in/out through gapi library
import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM } from './types';

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

////NOTE: package.json has a start script to run our API server at localhost:3001, db.json will act as the api server and store data

//action to create stream, this is called with a list of different values (formValues from StreamCreate) we enter to our form from StreamCreate as an argument
//will do a POST to 'streams' array in db.json
//since these are async action creators, need to manually dispatch!
//makes use of getState to extract userId from store, need to know who made which stream 
export const createStream = (formValues) => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});

    dispatch({type: CREATE_STREAM, payload: response.data});

    //do some programmatic navigation after dispatch, go back to localhost:3000 root route
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({type: FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({type: FETCH_STREAM, payload: response.data});
};

//formValues contains updates to the stream
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`streams/${id}`, formValues);

    dispatch({type: EDIT_STREAM, payload: response.data});
    //do some programmatic navigation after dispatch, go back to localhost:3000 root route
    history.push('/')
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({type: DELETE_STREAM, payload: id});
    history.push('/');
};