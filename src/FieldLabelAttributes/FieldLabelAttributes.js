import React from 'react';
import {bool, node} from 'prop-types';
import styles from './FieldLabelAttributes.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Tooltip from '../Tooltip';
import Info2 from '../Icons/dist/components/Info2';

class FieldLabelAttributes extends WixComponent {
  static tooltipDefaultProps = {
    moveBy: {x: 0, y: -1},
    minWidth: '150px'
  };

  infoIcon =
    <span
      data-hook="info"
      className={styles.icon}
      >
      <Info2 size="18px"/>
    </span>;


  getTooltip = () => {
    if (this.props.info) {
      return React.createElement(
        Tooltip,
        {
          ...this.tooltipDefaultProps,
          appendToParent: this.props.appendToParent,
          content: this.props.info,
          children: this.infoIcon
        }
      );
    } else if (this.props.tooltip) {
      return React.cloneElement(
        this.props.tooltip,
        {
          ...this.tooltipDefaultProps,
          children: this.props.tooltip.props.children || this.infoIcon
        }
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className={styles.root}
        data-hook="field-label-attributes"
        >
        { this.props.required && <span data-hook="required" className={styles.required}/> }

        { this.getTooltip() }
      </div>
    );
  }
}

FieldLabelAttributes.defaultProps = {
  required: false,
  info: '',
  appendToParent: true,
  tooltip: null
};

FieldLabelAttributes.propTypes = {
  required: bool,
  info: node,
  appendToParent: bool,
  tooltip: node
};

export default FieldLabelAttributes;
