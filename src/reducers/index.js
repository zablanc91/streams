import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';

//note, must use 'form' specifically for Redux Form!
export default combineReducers({
    auth: authReducer,
    form: formReducer
});