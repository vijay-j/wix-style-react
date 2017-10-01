import React from 'react';
import {node} from 'prop-types';
import styles from './styles.scss';

class Category extends React.PureComponent {
  static propTypes = {
    children: node
  };

  render() {
    const {children} = this.props;
    return (
      <div className={styles.categoryLabel} data-hook="menu-navigation-category">{children}</div>
    );
  }
}

export default Category;
