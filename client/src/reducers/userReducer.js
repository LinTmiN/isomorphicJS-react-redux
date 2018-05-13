import {handleActions} from 'redux-actions';
import { UserState } from '../constants/models';
import {
		REQUEST_LOGIN,
	RECEIVE_USER.
	LOGIN_ERROR,
	CHECK_AUTH,
	REGISTER_START,
	REGISTER_SUCCESS,
	SET_AUTH,
	REGISTER_FAILED,
	REGISTER,
	LOGIN,
	LOGOUT,
} from '../constants/actionTypes';
const userReducers = handleActions({
	REQUEST_LOGIN:(state)=>{
		state.merge({isLoging:true})
	},
	RECEIVE_USER:(state,{ payload })=>{
		state.merge({userInfo:payload})
	},
	REGISTER_START:(state)=>{
		state.merge({isRegister:true})
	},
	REGISTER_FAILED:(state)=>{
		state.merge({isRegister:false})
	},
	REGISTER_SUCCESS:(state)=>{
		state.merge({isRegister:false})
	},
	SET_AUTH:(state,{payload})=>{
		state.merge({isAuthorized:payload.value})
	}
},UserState);
export default userReducers;