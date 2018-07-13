import {handleActions} from 'redux-actions';
import { InputState } from '../constants/models';



const inputReducer = handleActions({
	SET_INPUT:(state,{payload})=>{
		return state.set(payload.key,payload.value)
	},
	GET_SCREEN:(state,{payload})=>{
		return state.merge({screen:payload})
		
	},
	GET_SCROLL:(state,{payload})=>{
		return state.merge({scrollTop:payload})
	},

	SWITCH_TYPE:(state)=>{
		return state.merge({username:'',email:"",password:""})
	},
	VALIDATE:(state,{payload})=>{
		return state.merge({validate:payload})
	},
	

},InputState)
export default inputReducer;
