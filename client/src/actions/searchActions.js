import { createAction } from 'redux-actions';
import {
	REQUEST_DATA,
	RECEIVE_DATA,
	VALUE_CHANGE,
	ADD_HISTORY,
	CLEAN_RESULT,
} from '../constants/actionTypes';
export const requestData = createAction('REQUEST_DATA')
export const receiveData = createAction('REQUEST_DATA')
export const valueChange = createAction('VALUE_CHANGE')
export const addHistory = createAction('ADD_HISTORY')
export const cleanResult = createAction('CLEAN_RESULT')