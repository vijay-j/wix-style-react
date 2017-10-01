import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Promotion extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {children} = this.props;
    return (
      <div className={styles.promotion} data-hook="menu-promotion">
        {children}
      </div>
    );
  }
}

export default Promotion;
