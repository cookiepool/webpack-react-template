import React, { Component } from 'react';

import { Input, Button, List, Divider } from 'antd';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 借助redux-thunk将异步请求写在action里面
// import axios from 'axios';

import {
  changeInputAction,
  addNewItemAction,
  deleteItemAction,
  getListAction
} from '../store/actionCreatores';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'haha' };
    console.log(props);
  }

  componentDidMount() {
    this.props.handleGetList();
    // 借助redux-thunk将异步请求写在action里面
    // axios.get('http://api.test.com/v1/list').then((res) => {
    //   console.log(res);
    //   this.props.handleGetList(res.data.data.list);
    // });
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <h3>{name}</h3>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ name: 'yaya' });
          }}
        >
          修改名字
        </Button>
        <Divider />
        <Input
          onChange={this.props.handleChange}
          placeholder={this.props.inputValue}
          style={{ width: '92%' }}
          value={this.props.inputValue}
        ></Input>
        <Button onClick={this.props.handleAdd} type="primary">
          添加
        </Button>

        <List
          dataSource={this.props.list}
          bordered
          renderItem={(item, idx) => {
            return (
              <List.Item
                actions={[
                  <Button
                    key={idx}
                    onClick={this.props.handleDelete(idx)}
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

TodoList.propTypes = {
  handleChange: PropTypes.func,
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func,
  inputValue: PropTypes.string,
  list: PropTypes.array,
  handleGetList: PropTypes.func
};

const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  };
};

// 如果这儿不写dispatchToProps的话，可以在props里面找到dispatch方法
const dispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      const action = changeInputAction(e.target.value);
      dispatch(action);
    },
    handleAdd() {
      const action = addNewItemAction();
      dispatch(action);
    },
    handleDelete: (index) => () => {
      const action = deleteItemAction(index);
      dispatch(action);
    },
    handleGetList() {
      const action = getListAction();
      dispatch(action);
    }
  };
};

export default connect(stateToProps, dispatchToProps)(TodoList);
