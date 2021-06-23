import React from 'react';

import styles from '@/App.scss';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2 className={ styles['about-text'] }>This is about page</h2>
    )
  }
}

export default About;