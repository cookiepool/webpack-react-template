import { takeEvery, put, all } from 'redux-saga/effects';

import { GET_LIST_SAGA } from './actionTypes';
import { getListAction } from './actionCreatores';

import axios from 'axios';

function* getList() {
  const res = yield axios.get('http://api.test.com/v1/list');
  const action = getListAction(res.data.data.list);
  yield put(action);
}

function* watchGetList() {
  yield takeEvery(GET_LIST_SAGA, getList);
}

function* rootSaga() {
  yield all([watchGetList()]);
}

export default rootSaga;
