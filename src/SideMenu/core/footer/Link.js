import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Link extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node
  };

  render() {
    const {children, icon, ...rest} = this.props;
    return (
      <a className={styles.link} {...rest}>
        { icon && <div className={styles.linkIcon}>{icon}</div> }
        {children}
      </a>
    );
  }
}

export default Link;
