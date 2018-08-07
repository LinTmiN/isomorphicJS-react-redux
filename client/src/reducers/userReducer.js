import {handleActions} from 'redux-actions';
import { UserState } from '../constants/models';
const userReducers = handleActions({
	SWITCH_TYPE:(state,{payload})=>{
		return state.merge({switchType:payload,loginError:''})
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
	REGISTER_FAILED:(state,{payload})=>(
		state.merge({isRegister:false,loginError:payload})
	),
	REGISTER_END:(state)=>(
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
	},
	GET_TRENDS:(state,{payload})=>{
		return state.merge({trends:payload})
	},
	IS_GET_TRENDS:(state,{payload})=>{
		return state.merge({isGetTrends:payload})
	},
	IS_EDIT_AVATAR:(state,{payload})=>state.merge({isEditAvatar:payload}),
	EDITED_AVATAR:(state,{payload})=>state.setIn(['userInfo','avatar'],payload),
	EDIT_AVATAR_STATUS:(state,{payload})=>state.merge({editAvatarStatus:payload}),
	GET_MY_LIKES:(state,{payload})=>{
		return state.merge({myLikesInfo:payload})
	},
	GET_MY_COLLECT:(state,{payload})=>state.merge({myCollectInfo:payload}),
	UPDATE_USER:(state,{payload})=>state.mergeIn(['userInfo'],{...payload})

},UserState);
export default userReducers;