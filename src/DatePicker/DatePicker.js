import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import ReactDatepicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';
import moment from 'moment';
import classnames from 'classnames';
import css from './DatePicker.scss';

export default class DatePicker extends WixComponent {
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    filterDate: PropTypes.func,
    excludePastDates: PropTypes.bool,
    readOnly: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    rtl: PropTypes.bool,
    placeholderText: PropTypes.string,
    theme: PropTypes.string,
    prefix: PropTypes.node,
    inputDataHook: PropTypes.string,
    dataHook: PropTypes.string,
    onEnterPressed: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    customInput: PropTypes.node
  };

  static defaultProps = {
    style: {
      width: 150
    },

    filterDate: () => true
  };

  constructor(props) {
    super(props);
    this.filterDate = this.filterDate.bind(this);
  }

  filterDate(date) {
    if (this.props.excludePastDates) {
      if (date < moment().startOf('d')) {
        return false;
      }
    }

    return this.props.filterDate(date);
  }

  renderInput() {
    const {
      rtl, style, theme, prefix, inputDataHook, onEnterPressed,
      error, errorMessage, customInput
    } = this.props;
    return (
      <DatePickerInput
        rtl={rtl} style={style} theme={theme} prefix={prefix} dataHook={inputDataHook}
        onEnterPressed={onEnterPressed} error={error} errorMessage={errorMessage}
        customInput={customInput}
        />
    );
  }

  render() {
    const cssClasses = [css.wrapper];
    if (this.props.showYearDropdown || this.props.showMonthDropdown) {
      cssClasses.push({'react-datepicker--hide-header': true});
    } else {
      cssClasses.push({'react-datepicker--hide-header__dropdown': true});
    }
    return (
      <div className={classnames(cssClasses)}>
        <ReactDatepicker
          {...this.props}
          selected={this.props.value}
          onChange={val => {
            if (this.filterDate(val)) {
              this.props.onChange(val);
            }
          }}
          customInput={this.renderInput()}
          filterDate={this.filterDate}
          readOnly={this.props.readOnly}
          showYearDropdown={this.props.showYearDropdown}
          scrollableYearDropdown
          />
      </div>
    );
  }
}
