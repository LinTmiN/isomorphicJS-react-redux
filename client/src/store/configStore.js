import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Immutable from 'immutable';
import rootReducer from '../reducers'

const initialState=Immutable.Map();
export default createStore(
	rootReducer,
	initialState,
	applyMiddleware(promise,reduxThunk)
)