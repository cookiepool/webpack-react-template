import React from 'react';

import styles from './App.scss';
import './assets/css/common.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Hello,React!'
    }
  }

  render() {
    return(
      <div className={styles['all-wraper'] + ' flex-all-center'}>
        <div className={styles.text}>{ this.state.msg }</div>
        <div className={styles.wraper}>
          <p className={styles.content}>前端框架</p>
        </div>
      </div>
    )
  }
}

export default App;