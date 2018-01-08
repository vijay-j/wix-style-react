'use strict';
const React = require('react');
const PropTypes = require('prop-types');
import flow from 'lodash/flow';
import map from 'lodash/fp/map';
import every from 'lodash/fp/every';
import includes from 'lodash/includes';
import toUpper from 'lodash/toUpper';
import assign from 'lodash/assign';
import isUndefined from 'lodash/isUndefined';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import get from 'lodash/get';
import TagListInput from './tagListInput';
import ItemCheckbox from './itemCheckbox';
import Text from '../Text';
import styles from './multiLevelCheckbox.scss';
import withClickOutside from '../withClickOutside';
// import {NoSearchResults} from 'wix-style-react/Icons';

//TODO:
//1. Add NoSearchResults icon
//2. Tests
//3. Documentation + story

const expandedByDefault = true;

const getAllItemsObject = (allItems, allItemChecked) => ({label: allItems, value: allItems, section: true, items: [
    {label: allItems, value: allItems, items: [], checked: allItemChecked}
]});

const areAllItemsSelected = item => item.checked && every(areAllItemsSelected, item.items);
const areAllSectionsSelected = sections => every(section => areAllItemsSelected(section), sections);

const getItemCheckState = item => {
  if (item.section) {
    return;
  }

  const firstState = !!get(item, 'items[0].checked') && !get(item, 'items[0].indeterminate');

  const indeterminate = {
    indeterminate: true,
    checked: true
  };
  const initial = {
    checked: firstState
  };

  if (item.items.length === 0) {
    return item.checked;
  }

  return every({checked: firstState}, item.items) ? initial : indeterminate;
};

const getMatchingItems = (item, filterText) => {
  const matchingSubItems = flatMap(item.items, subItem => getMatchingItems(subItem, filterText));

  const isLabelMatches = includes(toUpper(item.label), toUpper(filterText));
  if (matchingSubItems.length === 0 && !isLabelMatches) {
    return [];
  }

  return assign({}, item, {items: matchingSubItems}, getItemCheckState(item));
};

const extractItems = item => item.checked === true && areAllItemsSelected(item) ?
    {key: item.value, label: item.label} : flatMap(item.items, subItem => extractItems(subItem));


const extractItemsFromSection = section => {
  if (section.items) {
    return flatMap(section.items, item => extractItems(item));
  }
};

const getItemWithUpdatedCheckedState = (subItem, targetKey, value, allItems) => {
  const itemFound = subItem.value === targetKey || allItems === targetKey;

  return assign({}, subItem, {
    items: subItem.items.map(item => getItemWithUpdatedCheckedState(item, itemFound ? item.value : targetKey, value, allItems)),
    checked: itemFound ? value : subItem.checked
  });
};

class MultiLevelCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.showTreeView = this.showTreeView.bind(this);
    this.onItemCheckedStateChanged = this.onItemCheckedStateChanged.bind(this);
    this.isExpanded = this.isExpanded.bind(this);
    this.expandClicked = this.expandClicked.bind(this);
    this.removeLastTag = this.removeLastTag.bind(this);
    this.state = {treeViewOpen: false, filterText: '', isExpandedMapById: {}};
  }

  componentDidMount() {
    this.clickOutsideHandlerId = this.props.onClickOutside(() => this.showTreeView(false));
  }

  componentWillUnmount() {
    this.props.clearOnClickOutside(this.clickOutsideHandlerId);
  }

  removeLastTag() {
    const lastItem = last(this.getTagList());
    if (!isUndefined(lastItem)) {
      this.onItemCheckedStateChanged(lastItem.key, false);
    }
  }

  onFilterChanged(filter) {
    this.setState({filterText: filter});
  }

  showTreeView(show) {
    this.setState({treeViewOpen: show});
  }

  onItemCheckedStateChanged(key, value) {
    const newItems = map(section => getItemWithUpdatedCheckedState(section, key, value, this.props.allItems), this.props.value);
    this.props.onChange(newItems);
  }

  isExpanded(value) {
    return isUndefined(this.state.isExpandedMapById[value]) ?
            expandedByDefault :
            this.state.isExpandedMapById[value];
  }

  expandClicked(value) {
    const {isExpandedMapById} = this.state;
    this.setState({isExpandedMapById: assign({}, isExpandedMapById, {
      [value]: isUndefined(isExpandedMapById[value]) ? !expandedByDefault : !isExpandedMapById[value]
    })});
  }

  getTagList() {
    const isCheckedItemsOtherThanAll = this.props.allItems && areAllSectionsSelected(this.props.value);
    return isCheckedItemsOtherThanAll ?
            [{key: this.props.allItems, label: this.props.allItems}] :
            flatMap(this.props.value, section => extractItemsFromSection(section));
  }

  prepateItemList() {
    this.itemList = this.getItemList();
  }

  getItemList() {
    const {filterText} = this.state;

    const matchingItems = flatMap(this.props.value, section => getMatchingItems(section, filterText));

    const shouldAddAllItems = this.props.allItems && includes(toUpper(this.props.allItems), toUpper(filterText));
    if (shouldAddAllItems) {
      const areAllItemsInSectionSelected = section => every(areAllItemsSelected, section.items);

      const allItemChecked = every(areAllItemsInSectionSelected, matchingItems);

      return [getAllItemsObject(this.props.allItems, allItemChecked), ...matchingItems];
    }
    return matchingItems;
  }

  areAllFiltered(itemList) {
    return flow(
      map('items'),
      every(isEmpty))(itemList);
  }

  getTreeViewStyles() {
    const maxHeight = get(this.props.treeView, 'maxHeight');
    const minHeight = get(this.props.treeView, 'minHeight');
    const styles = {};
    if (maxHeight) {
      styles.maxHeight = maxHeight;
    }
    if (minHeight) {
      styles.minHeight = minHeight;
    }
    return styles;
  }

  renderItem(item) {
    return (
      <ItemCheckbox
        key={item.value}
        item={item}
        onChange={this.onItemCheckedStateChanged}
        isRoot
        filterText={this.state.filterText}
        isExpanded={this.isExpanded}
        expandClicked={this.expandClicked}
        />
    );
  }

  renderSection(section) {
    return (
      <div key={section.value}>
        {section.label !== this.props.allItems && section.items && section.items.length > 0 ? (
          <div className={styles.treeViewSection}>
            <Text appearance="H4">{section.label}</Text>
          </div>
        ) : null}

        {map(item => this.renderItem(item), section.items)}
      </div>
    );
  }

  renderTreeView() {
    return map(section => this.renderSection(section), this.itemList);
  }

  render() {
    this.prepateItemList();
    return (
      <div className={styles.multiLevelCheckbox}>
        <TagListInput
          value={this.getTagList()}
          onItemCheckedStateChanged={this.onItemCheckedStateChanged}
          maxHeight={get(this.props.tagList, 'maxHeight')}
          width={this.props.width}
          filterText={this.state.filterText}
          onFilterChanged={this.onFilterChanged}
          showTreeView={this.showTreeView}
          removeLastTag={this.removeLastTag}
          placeholder={this.props.placeholder}
          />

        {this.state.treeViewOpen ? (
          <div className={styles.treeView} style={this.getTreeViewStyles()}>
            {this.renderTreeView()}
            {this.areAllFiltered(this.itemList) ? (
              <div className={styles.notFoundWrapper}>
                {/*<Google/>*/}
                <div className={styles.notFoundText}>{this.props.noItemsFoundText}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

MultiLevelCheckbox.displayName = 'MultiLevelCheckbox';
MultiLevelCheckbox.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  allItems: PropTypes.string,
  tagList: PropTypes.shape({
    maxHeight: PropTypes.number
  }),
  treeView: PropTypes.shape({
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number
  }),
  width: PropTypes.number,
  noItemsFoundText: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired,
  clearOnClickOutside: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default withClickOutside(MultiLevelCheckbox);
