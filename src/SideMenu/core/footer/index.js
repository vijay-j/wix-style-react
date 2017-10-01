import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Footer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.nodes
  }

  render() {
    const {children} = this.props;
    return (
      <div className={styles.footer} data-hook="menu-footer">
        {children}
      </div>
    );
  }
}

export default Footer;
