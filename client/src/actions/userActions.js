import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI'
export const requestLogin = createAction('REQUEST_LOGIN');
export const receiveUser = createAction('RECEIVE_USER');
export const loginError = createAction('LOGIN_ERROR');
export const checkAuth = createAction('CHECK_AUTH',WebAPI.checkAuth);
export const registerStart = createAction('REGISTER_START');
export const registerSuccess = createAction ('REGISTER_SUCCESS');
export const setAuth= createAction('SET_AUTH');
export const registerFailed = createAction('REGISTER_FAILED');
export const register = createAction('REGISTER',WebAPI.register);
export const login =createAction('LOGIN',WebAPI.login);
export const logout =createAction('LOGOUT',WebAPI.logout);
export const switchType = createAction('SWITCH_TYPE')

