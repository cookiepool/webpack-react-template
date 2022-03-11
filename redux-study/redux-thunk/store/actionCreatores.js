import axios from 'axios';

import {
  CHANGE_INPUT,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  GET_LIST
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

// export const getListAction = (data) => ({
//   type: GET_LIST,
//   data
// });

export const getListAction = () => {
  // 如果不使用redux-thunk中间件的话，这种写法会报错
  return (dispatch) => {
    axios.get('http://api.test.com/v1/list').then((res) => {
      dispatch({
        type: GET_LIST,
        data: res.data.data.list
      });
    });
  };
};
