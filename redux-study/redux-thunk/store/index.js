import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';

// 引入redux-thunk
import thunk from 'redux-thunk';

// 为了使用Redux Dev Tool，需要使用增强函数compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE
  ? window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
