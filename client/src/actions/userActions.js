import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI'
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
export const requestLogin = createAction('AUTH_START');
export const receiveUser = createAction('RECEIVE_USER');
export const loginError = createAction('LOGIN_ERROR');
export const chekAuth = createAction('CHECK_AUTH');
export const registerStart = createAction('REGISTER_START');
export const registerSuccess = createAction ('REGISTER_SUCCESS');
export const setAuth= createAction('SET_AUTH');
export const registerFiled = createAction('REGISTER_FAILED');
export const register = createAction('REGISTER',WebAPI.register);
export const login =createAction('LOGIN',WebAPI.login);
export const logout =createAction('LOGOUT',WebAPI.logout)

