import { createAction } from 'redux-actions';
import {
	REQUEST_COLLECT,
	RECEIVE_COLLECT,
	ADD_COLLECT,
	DELETE_COLLECT,
} from '../constants/actionTypes';
export const requestCollect  =createAction('REQUEST_COLLECT');
export const receiveCollect   =createAction('RECEIVE_COLLECT');
export const addCollect  =createAction('ADD_COLLECT');
export const deleteCollect  =createAction('DELETE_COLLECT');