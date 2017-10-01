import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Logo extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  render() {
    const {onClick, children} = this.props;
    return (
      <button onClick={onClick} className={styles.logo} data-hook="menu-header">
        {children}
      </button>
    );
  }
}

export default Logo;
