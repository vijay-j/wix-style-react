import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import Input from '../Input';
import styles from './InputWithTags.scss';
import omit from 'omit';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';

class InputWithTags extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);

    this.state = {inputValue: '', inputHasFocus: false, hasHover: false};
  }

  componentDidMount() {
    this.props.autoFocus && this.props.onFocus();
  }

  handleClick(e) {
    this.input.focus();
    this.props.onInputClicked && this.props.onInputClicked(e);
  }

  handleInputFocus(e) {
    !this.state.inputHasFocus && this.setState({inputHasFocus: true}, () => {
      this.props.onFocus && this.props.onFocus(e);
    });
  }

  handleInputBlur(e) {
    this.state.inputHasFocus && this.setState({inputHasFocus: false}, () => {
      this.props.onBlur && this.props.onBlur(e);
    });
  }

  handleHover() {
    const {tags} = this.props;
    if (!this.state.hasHover && tags.length === 0) {
      this.setState({hasHover: true});
    } else {
      this.setState({hasHover: false});
    }
  }

  render() {
    const {tags, onRemoveTag, placeholder, error, disabled, delimiters, ...inputProps} = this.props;
    const {inputHasFocus: hasFocus, hasHover} = this.state;

    const className = classNames({
      [styles.tagsContainer]: true,
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles.hasFocus]: hasFocus,
      [styles.hasHover]: hasHover,
      [styles.hasMaxHeight]: !isUndefined(this.props.maxHeight) || !isUndefined(this.props.maxNumRows)
    });

    const desiredProps = omit([
      'onManuallyInput',
      'inputElement',
      'closeOnSelect',
      'predicate',
      'menuArrow',
      'onClickOutside',
      'fixedHeader',
      'fixedFooter',
      'dataHook',
      'onFocus',
      'onBlur',
      'onInputClicked'], inputProps);
    const fontSize = (desiredProps.size && desiredProps.size === 'small') ? '14px' : '16px';

    let rowMultiplier;
    if (tags.length && tags[0].size === 'large') {
      rowMultiplier = 48;
    } else {
      rowMultiplier = 36;
    }
    const maxHeight = this.props.maxHeight || this.props.maxNumRows * rowMultiplier || 'initial';

    return (
      <div
        className={className}
        style={{maxHeight}}
        onClick={() => this.handleClick()}
        onMouseOver={() => this.handleHover()}
        onMouseOut={() => this.handleHover()}
        data-hook={this.props.dataHook}
        >
        {tags.map(({label, ...rest}) => <Tag key={rest.id} disabled={disabled} onRemove={onRemoveTag} {...rest}>{label}</Tag>)}
        <span className={styles.input} data-hook="inner-input-with-tags">
          <div className={styles.hiddenDiv} style={{fontSize}}>
            {this.state.inputValue}
          </div>

          <Input
            width={this.props.width}
            ref={input => this.input = input}
            onFocus={() => this.handleInputFocus()}
            onBlur={() => this.handleInputBlur()}
            placeholder={tags.length === 0 ? placeholder : ''}
            {...desiredProps}
            dataHook="inputWithTags-input"
            disabled={disabled}
            onChange={e => {
              if (!delimiters.includes(e.target.value)) {
                this.setState({inputValue: e.target.value});
                desiredProps.onChange && desiredProps.onChange(e);
              }
            }}
            />
        </span>
      </div>
    );
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

  clear() {
    this.setState({
      inputValue: ''
    });
  }
}

InputWithTags.propTypes = {
  onRemoveTag: PropTypes.func,
  tags: PropTypes.array,
  maxHeight: PropTypes.string,
  maxNumRows: PropTypes.number,
  onKeyDown: PropTypes.func,
  dataHook: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInputClicked: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  delimiters: PropTypes.array,
  width: PropTypes.string
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: '',
  delimiters: []
};

export default InputWithTags;
