import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI.js';
export const requestLogin = createAction('REQUEST_LOGIN');
export const receiveUser = createAction('RECEIVE_USER');
export const loginError = createAction('LOGIN_ERROR');
export const registerStart = createAction('REGISTER_START');
export const registerSuccess = createAction ('REGISTER_SUCCESS');
export const setAuth= createAction('SET_AUTH');
export const registerFailed = createAction('REGISTER_FAILED');
export const register = createAction('REGISTER',WebAPI.register);
export const login =createAction('LOGIN',WebAPI.login);
export const logout =createAction('LOGOUT',WebAPI.logout);
export const switchType = createAction('SWITCH_TYPE');
export const isCheck = createAction('IS_CHECK')
export const getTrends =createAction('GET_TRENDS')
export const isGetTrends =createAction('IS_GET_TRENDS')
export const isEditAvatar = createAction('IS_EDIT_AVATAR')
export const editedAvatar = createAction('EDITED_AVATAR')
export const editAvatarStatus =createAction('EDIT_AVATAR_STATUS')
export const getMyCollect =createAction('GET_MY_COLLECT')
export const getMylikes =createAction("GET_MY_LIKES")
export const updateUser=createAction('UPDATE_USER')

