import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import WixComponent from '../../BaseComponents/WixComponent';
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
    const {value, vAlign, checked, disabled, name, type, onChange} = this.props;

    const {icon, children} = this.props;
    return (
      <div className="radioButtonWrapper">
        {type === 'button' ? (
          <button
            className="button"
            style-state={{checked, disabled}}
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
                className="stylableRadio"
                style-state={{labelAlignTop: vAlign === 'top'}}
                >
                <label className="radioLabel" data-hook="radio-label">
                  <div className="children">
                    {this.props.children}
                  </div>
                </label>
              </StylableRadioButton>
          )}
      </div>
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
