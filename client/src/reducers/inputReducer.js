import {handleActions} from 'redux-actions';
import { InputState } from '../constants/models';


import { SET_INPUT } from '../constants/actionTypes'
const inputReducer = handleActions({
	SET_INPUT:(state,{payload})=>{
		
		return state.set(payload.key,payload.value)
	}
},InputState)
export default inputReducer;
