import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import styles from '../RadioGroup.scss';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import typography, {convertFromUxLangToCss} from '../../Typography';
import {RadioButton as StylableRadioButton} from 'stylable-components';
import {stylable} from 'wix-react-tools';
import stStyles from './RadioButton.st.css';

@stylable(stStyles)
class RadioButton extends WixComponent {
  constructor(props) {
    super(props);
    this.id = uniqueId();
  }

  render() {
    const {value, vAlign, checked, disabled, name, type, onChange, style} = this.props;

    const labelClasses = classNames({
      [styles.vcenter]: vAlign === 'center',
      [styles.vtop]: vAlign === 'top',
      [typography[convertFromUxLangToCss('T1.1')]]: true
    });

    const buttonClasses = classNames({
      [styles.checked]: checked,
      [styles.radioButton]: true
    });

    const {icon, children} = this.props;
    return (
        type === 'button' ? (
          <button
            className={buttonClasses}
            checked={checked}
            disabled={disabled}
            id={this.id}
            onClick={() => (!checked && !disabled) ? onChange(value) : null}
            >
            {icon ? <span>{icon}</span> : null}
            {children ? <span>{children}</span> : null}
          </button>
            ) :
            (
              <StylableRadioButton
                name={name}
                value={value}
                id={this.id}
                checked={checked}
                disabled={disabled}
                onChange={() => (!checked && !disabled) ? onChange(value) : null}
                className="stylableButton"
                style-state={{labelAlignTop: vAlign === 'top'}}
                >
                <label htmlFor={this.id} className={'radioLabel ' + typography[convertFromUxLangToCss('T1.1')]} data-hook="radio-label">
                  <div className={styles.children}>
                    {this.props.children}
                  </div>
                </label>
              </StylableRadioButton>
            )
    );
  }
}

RadioButton.defaultProps = {
  vAlign: 'center'
};

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vAlign: PropTypes.oneOf(['center', 'top']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string,
};

RadioButton.displayName = 'RadioGroup.Button';

export default RadioButton;
