import {handleActions} from 'redux-actions';
import { SearchState } from '../constants/models';

const searchReducer =handleActions({
	REQUEST_DATA:(state,{payload})=>{
		return state.merge({issearching:payload})
	},
	RECEIVE_DATA:(state,{payload})=>{
		console.log('rec'+payload)
		return state.update('result',result=>result.concat(payload)).merge({issearching:false})
	},
	ADD_HISTORY:(state,{payload})=>{
       return state.update('history',history=>history.push(payload))
	},
	GET_KEY:(state,{payload})=>{
		
		return state.merge({"key":payload})
	},
	CLEAN_RESULT:(state)=>{
		return state.update('result',result=>[])
	},
	SET_PAGE:(state,{payload})=>(
		state.merge({page:payload})
	),
	TOGGLE_RESULTS:(state,{payload})=>(
		state.merge({resultsShow:payload})
	)

},SearchState)
export default searchReducer