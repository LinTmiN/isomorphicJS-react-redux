import { combineReducers } from 'redux-immutable';
import user from './userReducer';
import input from './inputReducer';

const rootReducer = combineReducers({
	user,
	input,
})
export default rootReducer;