import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI'

export const requestData = createAction('REQUEST_DATA')
export const getKey = createAction('GET_KEY')
export const setPage=createAction('SET_PAGE')
export const inputSearch =createAction('INPUT_SEARCH',WebAPI.getSearchKey)
export const toggleResults =createAction ('TOGGLE_RESULTS')
export const addResult = createAction('ADD_RESULT')
export const initResult = createAction ('INIT_RESULT')
export const preValue = createAction('PRE_VALUE')
export const isAdding =createAction('IS_ADDING')
export const isInit =createAction('IS_INIT')
export const isCardInit =createAction('IS_CARD_INIT')

