import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

//object based reducer for streams
//CREATE_STREAM, FETCH_STREAM, and EDIT STREAM have a response of a single record from the api, a single stream record to update store
//FETCH_STREAMS response is an array of records and DELETE_STREAM is none
export default (state = {}, action) => {
    switch(action.type){
        //mapKeys returns a big object with kv pairs pointing to streams then spread to add to our object
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            //remember, deleteStream action has payload of id instead of response.data
            //omit creates a new object with old properties from state without whatever passed in as action.payload
            return _.omit(state, action.payload);
        default:
            return state;
    }
};