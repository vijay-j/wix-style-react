import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

class LinkLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool,
    isDiminishedHover: PropTypes.bool,
    disabled: PropTypes.bool
  };

  render() {
    const {children, isDiminishedHover, isActive, disabled, ...rest} = this.props;
    return (
      <span
        className={classnames(styles.linkLayout, {
          [styles.linkActive]: isActive,
          [styles.linkDiminishedHover]: isDiminishedHover,
          [styles.linkDisabled]: disabled
        })}
        data-hook="menu-navigation-link-wrapper"
        {...rest}
        >
        {children}
      </span>
    );
  }
}

export default LinkLayout;
