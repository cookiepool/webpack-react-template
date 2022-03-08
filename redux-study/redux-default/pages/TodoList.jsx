import React, { Component } from 'react';

import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';

import store from '../../store/index';
import {
  changeInputAction,
  addNewItemAction,
  deleteItemAction
} from '../../store/actionCreatores';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'da'
    };
    this.state = store.getState();

    // 订阅变化
    // this.storeChange = this.storeChange.bind(this); // 这里必须bind，不然提示没有this，而且必须写在下面这句之前
    // 或者使用下面的箭头函数的写法也可以
    store.subscribe(this.storeChange);

    // this指向
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    // 通知redux
    const action = changeInputAction(e.target.value);
    store.dispatch(action);
  }
  handleAdd = () => {
    const action = addNewItemAction();
    store.dispatch(action);
  };
  handleDelete = (index) => () => {
    const action = deleteItemAction(index);
    store.dispatch(action);
  };

  storeChange = () => {
    this.setState(store.getState());
  };

  render() {
    return (
      <div>
        <Input
          onChange={this.handleChange}
          placeholder={this.state.inputValue}
          style={{ width: '92%' }}
          value={this.state.inputValue}
        ></Input>
        <Button onClick={this.handleAdd} type="primary">
          添加
        </Button>

        <List
          dataSource={this.state.list}
          bordered
          renderItem={(item, idx) => {
            return (
              <List.Item
                actions={[
                  <Button
                    key={idx}
                    onClick={this.handleDelete(idx)}
                    type="danger"
                  >
                    删除
                  </Button>
                ]}
              >
                {idx + 1}、{item}
              </List.Item>
            );
          }}
        ></List>
      </div>
    );
  }
}

export default TodoList;
