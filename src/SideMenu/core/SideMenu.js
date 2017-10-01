import React from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import {node, bool} from 'prop-types';

class SideMenu extends React.PureComponent {
  static propTypes = {
    children: node,
    inFlex: bool,
  };

  static defaultProps = {
    inFlex: false,
  };

  render() {
    const {children, inFlex} = this.props;
    const rootStyles = classNames({
      [styles.root]: true,
      [styles.inFlex]: inFlex
    });

    return (
      <div className={rootStyles} data-hook="side-menu">
        {children}
      </div>
    );
  }
}

export default SideMenu;
