import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';
import rootSaga from './saga.js';

// 引入redux-saga
import createSagaMiddleware from 'redux-saga';
// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

// 为了使用Redux Dev Tool，需要使用增强函数compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE
  ? window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
