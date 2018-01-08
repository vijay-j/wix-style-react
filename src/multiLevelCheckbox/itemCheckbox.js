'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import {ArrowDown, ArrowUp} from '../Icons';
import Checkbox from '../Checkbox';
import Text from '../Text';

import styles from './itemCheckbox.scss';

class ItemCheckbox extends React.Component {
  getCheckboxClasses() {
    return [
      styles.multiLevelCheckboxItem,
      this.props.isRoot ? styles.multiLevelCheckboxItemRoot : ''
    ].join(' ');
  }

  render() {
    return (
      <div>
        {!this.props.item.isFiltered ? (
          <div className={this.getCheckboxClasses()}>
            <div>
              <Checkbox
                className={styles.checkbox} checked={this.props.item.checked}
                indeterminate={this.props.item.indeterminate}
                onChange={() => this.props.onChange(this.props.item.value, !this.props.item.checked)}
                >
                <Text appearance="T2">
                  {this.props.item.label}
                </Text>
              </Checkbox>
              <span className={styles.arrow} onClick={() => this.props.expandClicked(this.props.item.value)}>
                {this.props.item.items && this.props.item.items.length > 0 ? (this.props.isExpanded(this.props.item.value) ? (<ArrowDown/>) : (<ArrowUp/>)) : null}
              </span>
            </div>
            {this.props.isExpanded(this.props.item.value) ? (
                map(this.props.item.items, item => (
                  <ItemCheckbox
                    item={item} key={item.value} onChange={this.props.onChange}
                    filterText={this.props.filterText} isExpanded={this.props.isExpanded}
                    expandClicked={this.props.expandClicked}
                    />
                ))
              ) : null}
          </div>) : null}
      </div>
    );
  }
}

ItemCheckbox.displayName = 'ItemCheckbox';
ItemCheckbox.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  isRoot: PropTypes.bool,
  filterText: PropTypes.string,
  isExpanded: PropTypes.func.isRequired,
  expandClicked: PropTypes.func.isRequired
};
export default ItemCheckbox;
