import { createAction } from 'redux-actions';

export const requestCollect  =createAction('REQUEST_COLLECT');
export const receiveCollect   =createAction('RECEIVE_COLLECT');
export const addCollect  =createAction('ADD_COLLECT');
export const deleteCollect  =createAction('DELETE_COLLECT');
export const isAdded = createAction('IS_ADDED');
export const isDelete = createAction('IS_DELETE')
export const fetchCollect = createAction('FETCH_COLLECT')