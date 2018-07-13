import { createStore,applyMiddleware } from 'redux';
import Immutable from 'immutable';
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'
import {UserState,InputState,SearchState} from '../constants/models'
import {Iterable} from 'immutable'
const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer,
});
const initialState=Immutable.fromJS({
      user:UserState,
      input:InputState,
      search:SearchState,
});
export default createStore(
	rootReducer,
	initialState,
	applyMiddleware(logger)
)