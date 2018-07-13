import { combineReducers } from 'redux-immutable';
import user from './userReducer';
import input from './inputReducer';
import search from './searchReducer'

const rootReducer = combineReducers({
	user,
	input,
    search,
    
})
export default rootReducer;