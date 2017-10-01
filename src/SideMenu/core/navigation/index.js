import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Navigation extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {children} = this.props;
    return (
      <div className={styles.navigation} data-hook="menu-navigation">
        {children}
      </div>
    );
  }
}

export default Navigation;
