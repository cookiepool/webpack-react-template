import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './pages/TodoList';
import 'antd/dist/antd.css';

// 引入react-redux
import store from './store/index';
import { Provider } from 'react-redux';

// 引入mock数据
import '../mock/index';

ReactDOM.render(
  <Provider store={store}>
    <TodoList></TodoList>
  </Provider>,
  document.getElementById('root')
);
