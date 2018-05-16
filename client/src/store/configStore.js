import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Immutable from 'immutable';
import rootReducer from '../reducers'
import {UserState,InputState,SearchState} from '../constants/models'
const initialState=Immutable.fromJS({
      user:UserState,
      input:InputState,
      search:SearchState
});
export default createStore(
	rootReducer,
	initialState,
	applyMiddleware(promise,reduxThunk)
)