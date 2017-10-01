import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Separator extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {children} = this.props;
    return (
      <div className={styles.separator} data-hook="menu-navigation-separator">
        {children}
      </div>
    );
  }
}

export default Separator;

