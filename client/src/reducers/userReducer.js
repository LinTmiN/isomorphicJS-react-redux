import {handleActions} from 'redux-actions';
import { UserState } from '../constants/models';
const userReducers = handleActions({
	SWITCH_TYPE:(state,{payload})=>{
		return state.merge({switchType:payload})
	}
	,
	REQUEST_LOGIN:(state,{payload})=>(
		state.merge({isLoging:payload})
	),
	RECEIVE_USER:(state,{ payload })=>{

	return	state.merge({userInfo:payload}).merge({isLoging:false})

	},
	REGISTER_START:(state)=>(
		state.merge({isRegister:true})
	),
	REGISTER_FAILED:(state)=>(
		state.merge({isRegister:false})
	),
	REGISTER_SUCCESS:(state)=>(
		state.merge({isRegister:false})
	),
	SET_AUTH:(state,{payload})=>(
		state.merge({isAuthorized:payload,loginError:''})
	),
	RECEIVE_COLLECT:(state,{payload})=>{
		return state.merge({collect:payload})
	},
	IS_ADDED:(state,{payload})=>{
		return state.merge({'isadded':payload})
	},
	IS_DELETE:(state,{payload})=>{
		return state.merge({'isdelete':payload})
	},
	IS_CHECK:(state,{payload})=>(
		state.merge({'isCheck':payload})
	),
	LOGIN_ERROR:(state,{payload})=>{
		return state.merge({loginError:payload})
	},
	FETCH_COLLECT:(state,{payload})=>{
		return state.merge({fetchCollect:payload})
	}
},UserState);
export default userReducers;