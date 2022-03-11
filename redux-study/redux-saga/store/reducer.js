import {
  CHANGE_INPUT,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  GET_LIST
} from './actionTypes';

const defaultState = {
  inputValue: '输入你想做的事情...',
  list: []
};

// 注意：Reducer里只能接收state，不能改变state。
export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_NEW_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '输入你想做的事情...';
    return newState;
  }

  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }

  if (action.type === GET_LIST) {
    // let newState = JSON.parse(JSON.stringify(state));
    // newState.list = newState.list.concat(action.data);
    return {
      ...state,
      list: state.list.concat(action.data)
    };
  }

  return state;
};
