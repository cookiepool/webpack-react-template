import { CHANGE_INPUT, ADD_NEW_ITEM, DELETE_ITEM } from './actionTypes';

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
