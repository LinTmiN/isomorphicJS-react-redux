import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI'
import {
	REQUEST_DATA,
	RECEIVE_DATA,
	VALUE_CHANGE,
	ADD_HISTORY,
	CLEAN_RESULT,
	GET_KEY,
} from '../constants/actionTypes';
export const requestData = createAction('REQUEST_DATA')
export const receiveData = createAction('RECEIVE_DATA')
export const addHistory = createAction('ADD_HISTORY')
export const cleanResult = createAction('CLEAN_RESULT')
export const getKey = createAction('GET_KEY')
export const setPage=createAction('SET_PAGE')
export const inputSearch =createAction('INPUT_SEARCH',WebAPI.getSearchKey)
export const confirmSearch = createAction('CONFIRM_SEARCH',WebAPI.getResult)