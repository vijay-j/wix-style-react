import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';
import omit from 'omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Highlighter from '../Highlighter/Highlighter';

class InputWithOptions extends WixComponent {

  // Abstraction
  inputClasses() {}
  dropdownClasses() {}
  dropdownAdditionalProps() {}
  inputAdditionalProps() {}

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value || '',
      showOptions: false,
      lastOptionsShow: 0,
      isEditing: false
    };

    this._onSelect = this._onSelect.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onManuallyInput = this._onManuallyInput.bind(this);
    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);
    this._onInputClicked = this._onInputClicked.bind(this);
    this.closeOnSelect = this.closeOnSelect.bind(this);
    this.onCompositionChange = this.onCompositionChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.options.length) {
      this.setState({showOptions: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.showOptionsIfEmptyInput &&
        ((!prevProps.value && this.props.value) || (!prevState.inputValue && this.state.inputValue))) {
      this.showOptions();
    }
  }

  onCompositionChange(isComposing) {
    this.setState({isComposing});
  }

  onClickOutside() {
    this.hideOptions();
  }

  renderInput() {
    const inputProps = Object.assign(omit(Object.keys(DropdownLayout.propTypes).concat(['onChange', 'dataHook']), this.props), this.inputAdditionalProps());
    const {inputElement} = inputProps;
    return React.cloneElement(inputElement, {
      menuArrow: true,
      ref: input => this.input = input,
      ...inputProps,
      theme: this.props.theme,
      onChange: this._onChange,
      onInputClicked: this._onInputClicked,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onCompositionChange: this.onCompositionChange,
      width: inputElement.props.width
    });
  }

  _processOptions(options) {
    return !this.props.highlight ? options : (
      options.map(option => {
        return {
          ...option,
          value: (
            <Highlighter match={this.state.inputValue} dataHook={`highlighter-${option.id}`}>
              {option.value}
            </Highlighter>
          )
        };
      })
    );
  }

  _renderDropdownLayout() {
    const dropdownProps = Object.assign(omit(Object.keys(Input.propTypes).concat(['dataHook']), this.props), this.dropdownAdditionalProps());
    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};

    if (this.props.dropdownWidth) {
      customStyle.width = this.props.dropdownWidth;
    }

    const isDropdownLayoutVisible = this.state.showOptions &&
      (this.props.showOptionsIfEmptyInput || this.state.inputValue.length > 0);

    return (
      <div className={this.dropdownClasses()} style={customStyle}>
        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          {...dropdownProps}
          options={this._processOptions(dropdownProps.options)}
          theme={this.props.theme}
          visible={isDropdownLayoutVisible}
          onClose={this.hideOptions}
          onSelect={this._onSelect}
          isComposing={this.state.isComposing}
          />
      </div>
    );
  }

  render() {
    const {dropDirectionUp} = this.props;
    return (
      <div>
        {dropDirectionUp ? this._renderDropdownLayout() : null}
        <div
          onKeyDown={this._onKeyDown}
          className={this.inputClasses()}
          onClick={this.showOptions}
          onFocus={this._onFocus}
          >
          {this.renderInput()}
        </div>
        {!dropDirectionUp ? this._renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    if (this.state.showOptions) {
      this.setState({showOptions: false});
    }
  }

  showOptions() {
    if (this.props.options.length) {
      this.setState({
        showOptions: true,
        lastOptionsShow: Date.now()
      });
    }
  }

  closeOnSelect() {
    return this.props.closeOnSelect;
  }

  _onManuallyInput(inputValue) {
    if (this.state.isComposing) {
      return;
    }

    inputValue = inputValue && inputValue.trim();
    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    const suggestedOption = this.props.options.find(
      element => element.value === inputValue
    );

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(inputValue, suggestedOption);
    }
  }

  _onSelect(option, isSelectedOption) {
    this.showOptions();
    const {onSelect} = this.props;

    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    if (isSelectedOption) {
      this.setState({showOptions: false});
    } else if (onSelect) {
      onSelect(this.props.highlight ? this.props.options.find(opt => opt.id === option.id) : option);
    }
  }

  _onChange(event) {
    this.setState({inputValue: event.target.value});

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  _onInputClicked(event) {
    if (this.state.showOptions && (Date.now() - this.state.lastOptionsShow > 2000)) {
      this.hideOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  _onFocus() {
    if (this.props.disabled) {
      return;
    }

    if (this.props.openOnFocus) {
      this.showOptions();
    }

    this.setState({isEditing: false});

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _onKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      this.setState({isEditing: true});
    }

    if (!this.dropdownLayout._onKeyDown(event)) {
      switch (event.key) {
        case 'Escape': {
          if (this.input) {
            this.input.blur();
          }
          break;
        }

        case 'ArrowDown':
        case 'ArrowUp': {
          this.showOptions();
          break;
        }

        case 'Enter': {
          this.showOptions();
          this._onManuallyInput(this.state.inputValue);
          break;
        }

        case 'Tab': {
          this._onManuallyInput(this.state.inputValue);
          break;
        }

        default:
          break;
      }
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}

InputWithOptions.defaultProps = {
  ...Input.defaultProps,
  ...DropdownLayout.defaultProps,
  onSelect: () => {},
  options: [],
  closeOnSelect: true,
  inputElement: <Input/>,
  valueParser: option => option.value,
  dropdownWidth: null,
  dropdownOffsetLeft: '0',
  showOptionsIfEmptyInput: true,
  openOnFocus: true
};

InputWithOptions.propTypes = {
  ...Input.propTypes,
  ...DropdownLayout.propTypes,
  inputElement: PropTypes.element,
  closeOnSelect: PropTypes.bool,
  onManuallyInput: PropTypes.func,
  valueParser: PropTypes.func,
  dropdownWidth: PropTypes.string,
  dropdownOffsetLeft: PropTypes.string,
  /** Controls whether to show options if input is empty */
  showOptionsIfEmptyInput: PropTypes.bool,
  highlight: PropTypes.bool,
  openOnFocus: PropTypes.bool
};

InputWithOptions.displayName = 'InputWithOptions';

export default InputWithOptions;
