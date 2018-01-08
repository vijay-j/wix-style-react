'use strict';
const React = require('react');
const PropTypes = require('prop-types');
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Tag from '../Tag';
import TextField from '..//TextField';
import ThemedInput from '../Input/ThemedInput';
import styles from './tagListInput.scss';

class TagListInput extends React.Component {
  constructor(props) {
    super(props);

    this.onRemoveTag = key => this.props.onItemCheckedStateChanged(key, false);

    this.onFilterChanged = ev => this.props.onFilterChanged(ev.target.value);

    this.onTagListClicked = () => this.filterTextInput.focus();

    this.onFilterTextFocus = () => this.props.showTreeView(true);

    this.storeFilterTextInput = filterTextInput => {
      this.filterTextInput = filterTextInput;
    };

    this.handleKeyDown = ev => {
      const backspaceKeyCode = 8;
      if (ev.keyCode === backspaceKeyCode && isEmpty(this.props.filterText)) {
        this.props.removeLastTag();
      }
    };

  }

  getStyle() {
    const styles = {};
    if (this.props.maxHeight) {
      styles.maxHeight = this.props.maxHeight;
    }
    if (this.props.width) {
      styles.width = this.props.width;
    }
    return styles;
  }

  getTags() {
    return map(this.props.value, tag => <span key={tag.key} className={styles.tag}><Tag onRemove={this.onRemoveTag} id={tag.key}>{tag.label}</Tag></span>);
  }

  render() {
    const tags = this.getTags();
    return (
      <div className={styles.tagListInput} onClick={this.onTagListClicked} style={this.getStyle()}>
        {tags}
        <div id={styles.filterTextField}>
          <TextField>
            <ThemedInput
              id="filter-text-field"
              onChange={this.onFilterChanged}
              ref={this.storeFilterTextInput} onFocus={this.onFilterTextFocus}
              onKeyDown={this.handleKeyDown}
              placeholder={tags.length === 0 ? this.props.placeholder : null}
              border={'none'}
              />
          </TextField>
        </div>
      </div>

    );
  }
}

TagListInput.displayName = 'TagListInput';
TagListInput.propTypes = {
  value: PropTypes.array.isRequired,
  onItemCheckedStateChanged: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  maxHeight: PropTypes.number,
  width: PropTypes.number,
  showTreeView: PropTypes.func,
  onFilterChanged: PropTypes.func,
  removeLastTag: PropTypes.func,
  filterText: PropTypes.string,
  placeholder: PropTypes.string
};

export default TagListInput;
