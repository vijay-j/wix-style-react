import React from 'react';
import {node, bool, func, oneOf, string} from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';

import styles from './TestComponent.scss';
import SvgV from '../svg/V';
import WixComponent from '../BaseComponents/WixComponent';
import Label from '../Label/Label';

/** a simple WixStyle testComponent */
class TestComponent extends WixComponent {
  static displayName = 'TestComponent';

  static propTypes = {
    /** used for automatic testing */
    active: bool,
    checked: bool,
    children: node,
    disabled: bool,
    hasError: bool,
    id: string,
    indeterminate: bool,

    /** used for automatic testing */
    hover: bool,
    size: oneOf(['medium', 'large']),
    onChange: func
  };

  static defaultProps = {
    checked: false,
    size: 'medium',
    onChange: e => {
      e.stopPropagation();
    }
  };

  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hasError, hover, active, size, onChange} = this.props;

    const classname = classNames(
      styles.wrapper,
      {
        [styles.checked]: checked,
        [styles.unchecked]: !checked,
        [styles.hover]: hover,
        [styles.active]: active,
        [styles.disabled]: disabled,
        [styles.hasError]: hasError
      }
    );

    const checkedSymbol = indeterminate ? <div className={styles.indeterminate}/> : <SvgV/>;

    return (
      <div className={classname}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={disabled ? null : onChange}
          />

        <Label for={id} appearance="T1.1">
          <div className={classNames(styles.testComponent, styles[size])}>
            <div className={styles.inner}>
              {checkedSymbol}
            </div>
          </div>

          <div className={styles.children}>
            {this.props.children}
          </div>
        </Label>
      </div>
    );
  }
}

export default TestComponent;
