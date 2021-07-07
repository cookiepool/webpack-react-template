import React from 'react';

import styles from './test.scss';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['test-wraper']}>
        <h2 className={styles['test-text']}>This is test page</h2>
        <h3 className={styles['test-h3-text']}>This is H3 fragment</h3>
      </div>
    );
  }
}

export default About;
