import React from 'react';
import {func, node} from 'prop-types';
import styles from './styles.scss';
import ArrowLeft from '../../../Icons/dist/components/ArrowLeft';

class BackLink extends React.PureComponent {
  static propTypes = {
    onBackHandler: func,
    children: node
  };

  render() {
    const {onBackHandler, children} = this.props;

    return (
      <a className={styles.backLink} onClick={onBackHandler} data-hook="menu-navigation-back-link">
        <span className={styles.backArrow}><ArrowLeft/></span>
        <span>{children}</span>
      </a>
    );
  }
}

export default BackLink;
