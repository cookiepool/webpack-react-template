import {
  CHANGE_INPUT,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  GET_LIST,
  GET_LIST_SAGA
} from './actionTypes';

export const changeInputAction = (value) => ({
  type: CHANGE_INPUT,
  value
});

export const addNewItemAction = () => ({
  type: ADD_NEW_ITEM
});

export const deleteItemAction = (index) => ({
  type: DELETE_ITEM,
  index
});

// 同步
export const getListAction = (data) => ({
  type: GET_LIST,
  data
});

// Saga
export const getListActionSaga = () => ({
  type: GET_LIST_SAGA
});
