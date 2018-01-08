'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import get from 'lodash/get';
import noop from 'lodash/noop';
import find from 'lodash/find';
import defaults from 'lodash/defaults';
import assign from 'lodash/assign';
import ReactTestUtils from 'react-dom/test-utils';
import multiLevelCheckbox from './multiLevelCheckbox';
import Tag from '../Tag';
import ItemCheckbox from './itemCheckbox';
import Checkbox from '../checkbox';
import tagListInputCss from './tagListInput.scss';
import multiLevelCheckboxCss from './multiLevelCheckbox.scss';
import ThemedInput from "../Input/ThemedInput";

const collapsedValue =
  [
    {label: 'with sub items', value: '1', items:
    [
      {label: 'sub 1 (with sub items)', value: '2', checked: true, items: [
          {label: 'sub 1-1', value: '2-1', checked: true, items: []},
          {label: 'sub 1-2', value: '2-2', checked: true, items: []},
        {label: 'sub 1-3', value: '2-3', checked: false, items: [
            {label: 'sub 1-3-1', value: '2-2-1', checked: true, items: []}
        ]}
      ]},
        {label: 'sub 2', value: '3', checked: true, items: []}
    ]
    },
    {label: 'root level', value: '4', checked: true, items: []}
  ];

const defaultValue =
  [
    {label: 'section 1 (with sub items)', value: '1', items:
    [
      {label: 'sub 1 (with sub items)', value: '2', isExpand: true, checked: false, items: [
          {label: 'sub 1-1', value: '2-1', checked: true, items: []},
          {label: 'sub 1-2', value: '2-2', checked: true, items: []},
        {label: 'sub 1-3 (with sub items)', value: '2-3', isExpand: true, checked: false, items: [
            {label: 'sub 1-3-1', value: '2-3-1', checked: false, items: []}

        ]}
      ]},
      {label: 'sub 2 (with sub items)', value: '3', checked: true, isExpand: true, items: [
          {label: 'another sub 1-1', value: '3-1', checked: true, isExpand: true, items: []}
      ]},
        {label: 'sub 3 (without sub items)', value: '4', checked: true, items: []}
    ]
    },
    {label: 'section 2 (empty)', value: '5', checked: true, items: []}
  ];

const allCheckedValue =
  [
    {label: 'with sub items', value: '1', items:
    [
      {label: 'sub 1 (with sub items)', value: '2', isExpand: true, checked: true, items: [
          {label: 'sub 1-1', value: '2-1', checked: true, items: []},
          {label: 'sub 1-2', value: '2-2', checked: true, items: []},
        {label: 'sub 1-3', value: '2-3', isExpand: true, checked: true, items: [
            {label: 'sub 1-3-1', value: '2-3-1', checked: true, items: []}

        ]}
      ]},
      {label: 'sub 2', value: '3', checked: true, isExpand: true, items: [
          {label: 'another sub 1-1', value: '3-1', checked: true, isExpand: true, items: []}
      ]}
    ]
    },
    {label: 'root level', value: '4', checked: true, items: []}
  ];

class TestComponentContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: this.props.value};

    this.onChange = newItems => {
      this.setState({items: newItems});
    };
  }

  render() {
    return React.createElement(multiLevelCheckbox, assign({}, this.props, {
      value: this.state.items,
      onChange: this.onChange
    }));
  }
}
TestComponentContext.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

const defaultAllItems = 'All Items';
const render = props => ReactTestUtils.renderIntoDocument(React.createElement(TestComponentContext, props));
const renderComp = props => render(
  defaults(props, {
    value: defaultValue,
    onChange: noop,
    allItems: props && props.allItems ? props.allItems : defaultAllItems
  })
);

describe('multiLevelCheckbox', () => {
  let comp;

  const getAllCheckboxLabels = () => map('props.label', ReactTestUtils.scryRenderedComponentsWithType(comp, Checkbox));

  const getAllCheckedCheckboxItems = () =>
    flow(
      filter('props.value'),
      map('props.label'))(ReactTestUtils.scryRenderedComponentsWithType(comp, Checkbox));

  const getAllTagLabels = () => map('props.value.label', ReactTestUtils.scryRenderedComponentsWithType(comp, Tag));

  const getCheckboxByLabel = label => find(ReactTestUtils.scryRenderedComponentsWithType(comp, Checkbox),
    ['props.label', label]);

  const getItemCheckboxByLabel = label => find(ReactTestUtils.scryRenderedComponentsWithType(comp, ItemCheckbox),
    ['props.item.label', label]);

  const getFilterTextField = () => {
    return ReactTestUtils.findRenderedDOMComponentWithClass(comp, tagListInputCss.filterTextField);
    // return ReactTestUtils.scryRenderedComponentsWithType(inputWrapper, ThemedInput);
  };

  const getAllArrowItems = () => ReactTestUtils.scryRenderedDOMComponentsWithClass(comp, 'arrow-down-wrapper');
  const getAllUpArrowItems = () => ReactTestUtils.scryRenderedDOMComponentsWithClass(comp, 'up');

  const simulateClickOnCloseTagButton = tagLabel => {
    const selectedTag = find(ReactTestUtils.scryRenderedComponentsWithType(comp, Tag),
      ['props.value.label', tagLabel]);
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithClass(selectedTag, 'x-button'));
  };
  const simulateBackspaceInTextField = () => ReactTestUtils.Simulate.keyDown(getFilterTextField(), {keyCode: 8});

  const simulateCheckboxClicked = label => getCheckboxByLabel(label).props.onChange();

  const simulateArrowClick = label => {
    const itemCheckbox = getItemCheckboxByLabel(label);
    itemCheckbox.props.expandClicked(itemCheckbox.props.item);
  };

  const setFilterText = filterText => {
    ReactTestUtils.Simulate.change(getFilterTextField(comp), {target: {value: filterText}});
  };

  const clickInside = () => {
    ReactTestUtils.Simulate.focus(getFilterTextField(comp));
  };

  afterEach(() => {
    if (comp) {
      const node = ReactDOM.findDOMNode(comp);
      if (node) {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(comp).parentNode);
      }
    }
    comp = undefined;
  });

  it('should render', () => {
    comp = renderComp();
    const element = ReactDOM.findDOMNode(comp);
    expect(element).toBeDefined();
  });

  describe('withClickOutside', () => {
    beforeEach(() => {
      comp = renderComp();
    });

    it('should not show checkbox tree view before clicking inside (tree-view class should not be found)', () => {
      expect(() => {
        ReactTestUtils.findRenderedDOMComponentWithClass(comp, multiLevelCheckboxCss.treeView);
      }).toThrow();
    });

    it('should show checkbox tree view when clicking inside while tree view is hidden', done => {
      clickInside();
      comp.forceUpdate(() => {
        const treeView = ReactTestUtils.findRenderedDOMComponentWithClass(comp, multiLevelCheckboxCss.treeView);
        expect(treeView).toBeDefined();
        done();
      });
    });

    it('should still show checkbox tree view when clicking inside while tree view is shown', done => {
      clickInside();
      clickInside();
      comp.forceUpdate(() => {
        const treeView = ReactTestUtils.findRenderedDOMComponentWithClass(comp, multiLevelCheckboxCss.treeView);
        expect(treeView).toBeDefined();
        done();
      });
    });

    // it('should hide checkbox tree view when clicking outside while tree view is shown', (done) => {
    //     clickInside()
    //     clickOutside()
    //     comp.forceUpdate(function () {
    //         const treeView = ReactTestUtils.findRenderedDOMComponentWithClass(comp, multiLevelCheckboxCss.treeView)
    //         expect(treeView).toBeUndefined()
    //         done()
    //     })
    // })
    //
    // it('should still not show checkbox tree view when clicking outside while tree view is hidden', (done) => {
    //     clickInside()
    //     clickOutside()
    //     clickOutside()
    //     comp.forceUpdate(function(){
    //         const treeView = ReactTestUtils.findRenderedDOMComponentWithClass(comp, multiLevelCheckboxCss.treeView)
    //         expect(treeV iew).toBeUndefined()
    //         done()
    //     })
    // })
  });

  describe('Filter text', () => {
    it('should show all item schema (top level) when no filter is applied and tree is collapsed', done => {
      comp = renderComp({value: collapsedValue});
      clickInside();
      comp.forceUpdate(() => {
        const expectedCheckboxLabels = [defaultAllItems, 'sub 1 (with sub items)', 'sub 2'];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should show all item schema (top level) when no filter is applied and tree is expanded', done => {
      comp = renderComp();
      clickInside();
      comp.forceUpdate(() => {
        const expectedCheckboxLabels = [
          defaultAllItems, 'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2',
          'sub 1-3 (with sub items)', 'sub 1-3-1', 'sub 2 (with sub items)',
          'another sub 1-1', 'sub 3 (without sub items)'
        ];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should show all parent items when a sub item matches filter text and not other non-matching siblings', done => {
      comp = renderComp();
      clickInside();
      setFilterText('sub 1-1');

      comp.forceUpdate(() => {
        const expectedCheckboxLabels = ['sub 1 (with sub items)', 'sub 1-1', 'sub 2 (with sub items)', 'another sub 1-1'];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should show not show sub items when only parent matches filter', done => {
      comp = renderComp();
      clickInside();
      setFilterText('with sub items');

      comp.forceUpdate(() => {
        const expectedCheckboxLabels = ['sub 1 (with sub items)', 'sub 1-3 (with sub items)', 'sub 2 (with sub items)'];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should show only allItems checkbox when filter matches allItems', done => {
      comp = renderComp();
      clickInside();
      setFilterText(defaultAllItems);

      comp.forceUpdate(() => {
        const expectedCheckboxLabels = [defaultAllItems];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should not show matched items which are collapsed, but only their parents', done => {
      comp = renderComp({value: collapsedValue});
      clickInside();
      setFilterText('sub 1-3-1');
      comp.forceUpdate(() => {
        const expectedCheckboxLabels = ['sub 1 (with sub items)'];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });

    it('should show matched items which are expanded and all their path', done => {
      comp = renderComp();
      clickInside();
      setFilterText('sub 1-3-1');
      comp.forceUpdate(() => {
        const expectedCheckboxLabels = ['sub 1 (with sub items)', 'sub 1-3 (with sub items)', 'sub 1-3-1'];
        expect(expectedCheckboxLabels).toEqual(getAllCheckboxLabels());
        done();
      });
    });
  });

  describe('All items', () => {
    describe('defined', () => {
      describe('availability of allItems', () => {
        it('should show allItems checkbox when filter is not applied', done => {
          comp = renderComp();
          clickInside();
          comp.forceUpdate(() => {
            expect(getAllCheckboxLabels()).toContain(defaultAllItems);
            done();
          });
        });

        it('should show allItems checkbox when allItems label matches filter text', done => {
          comp = renderComp();
          clickInside();
          setFilterText(defaultAllItems);

          comp.forceUpdate(() => {
            expect(getAllCheckboxLabels()).toEqual([defaultAllItems]);
            done();
          });
        });

        it('should not show allItems checkbox when allItems label do not match filter text', done => {
          comp = renderComp();
          clickInside();
          setFilterText('abc');

          comp.forceUpdate(() => {
            expect(getAllCheckboxLabels().length).toEqual(0);
            done();
          });
        });

        it('should show only allItems tag when all items are selected', done => {
          comp = renderComp({value: allCheckedValue});
          clickInside();
          comp.forceUpdate(() => {
            expect(getAllTagLabels()).toEqual([defaultAllItems]);
            done();
          });
        });
      });

      describe('changing allItems state', () => {
        it('should make allItems checked and only allItems tag appear in tag list when checking allItems toggle', done => {
          comp = renderComp();
          clickInside();
          comp.forceUpdate(() => {
            simulateCheckboxClicked(defaultAllItems);
            comp.forceUpdate(() => {
              const expectedCheckedLabels = [
                defaultAllItems, 'sub 1 (with sub items)', 'sub 1-1',
                'sub 1-2', 'sub 1-3 (with sub items)', 'sub 1-3-1',
                'sub 2 (with sub items)', 'another sub 1-1', 'sub 3 (without sub items)'
              ];
              expect(getAllCheckboxLabels()).toEqual(expectedCheckedLabels);
              expect(getAllTagLabels()).toEqual([defaultAllItems]);
              done();
            });
          });
        });

        it('should make all items unchecked when unchecking allItems state', done => {
          comp = renderComp();
          clickInside();
          comp.forceUpdate(() => {
            simulateCheckboxClicked(defaultAllItems);
            comp.forceUpdate(() => {
              simulateCheckboxClicked(defaultAllItems);
              comp.forceUpdate(() => {
                expect(getAllCheckedCheckboxItems().length).toEqual(0);
                expect(getAllTagLabels().length).toEqual(0);
                done();
              });
            });
          });
        });

        it('should make allItems checked and only allItems tag appear in tag list when checking last unchecked item', done => {
          comp = renderComp();
          clickInside();
          comp.forceUpdate(() => {
            simulateCheckboxClicked('sub 1 (with sub items)');
            comp.forceUpdate(() => {
              const expectedCheckedItems = [
                defaultAllItems, 'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2',
                'sub 1-3 (with sub items)', 'sub 1-3-1', 'sub 2 (with sub items)', 'another sub 1-1',
                'sub 3 (without sub items)'
              ];
              expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);
              expect(getAllTagLabels()).toEqual([defaultAllItems]);
              done();
            });
          });
        });

      });
    });

    describe('not defined', () => {
      it('should not show allItems checkbox when filter is not applied', done => {
        comp = renderComp({allItems: undefined});
        clickInside();
        comp.forceUpdate(() => {
          const expectedCheckboxLabels = [
            'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2',
            'sub 1-3 (with sub items)', 'sub 1-3-1', 'sub 2 (with sub items)', 'another sub 1-1',
            'sub 3 (without sub items)'
          ];
          expect(getAllCheckboxLabels()).toEqual(expectedCheckboxLabels);
          done();
        });
      });

      it('should not show allItems tag when all items are checked', done => {
        comp = renderComp({allItems: undefined});
        clickInside();
        comp.forceUpdate(() => {
          simulateCheckboxClicked('sub 1 (with sub items)');
          comp.forceUpdate(() => {
            const expectedCheckedItems = [
              'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2', 'sub 1-3 (with sub items)',
              'sub 1-3-1', 'sub 2 (with sub items)', 'another sub 1-1',
              'sub 3 (without sub items)'
            ];
            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);

            const expectedAllTags = [
              'sub 1 (with sub items)', 'sub 2 (with sub items)', 'sub 3 (without sub items)'
            ];
            expect(getAllTagLabels()).toEqual(expectedAllTags);
            done();
          });
        });
      });
    });
  });

  describe('changing checkbox state', () => {
    describe('pressing backspace', () => {
      it('should uncheck and remove last item as mentioned in last tag when filter text is empty', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          const expectedCheckedItemsBefore = [
            'sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'another sub 1-1',
            'sub 3 (without sub items)'
          ];
          expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItemsBefore);

          const expectedAllTagsBefore = [
            'sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'sub 3 (without sub items)'
          ];
          expect(getAllTagLabels()).toEqual(expectedAllTagsBefore);

          simulateBackspaceInTextField();
          comp.forceUpdate(() => {
            const expectedCheckedItemsAfter = [
              'sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'another sub 1-1'
            ];
            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItemsAfter);

            const expectedAllTagsAfter = ['sub 1-1', 'sub 1-2', 'sub 2 (with sub items)'];
            expect(getAllTagLabels()).toEqual(expectedAllTagsAfter);
            done();
          });
        });
      });

      it('should not uncheck any item when filter text is not empty', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          setFilterText('s');
          comp.forceUpdate(() => {
            const expectedCheckedItems = [
              'sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'another sub 1-1',
              'sub 3 (without sub items)'
            ];
            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);

            const expectedAllTags = [
              'sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'sub 3 (without sub items)'
            ];
            expect(getAllTagLabels()).toEqual(expectedAllTags);

            simulateBackspaceInTextField();
            comp.forceUpdate(() => {
              expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);
              expect(getAllTagLabels()).toEqual(expectedAllTags);
              done();
            });
          });
        });
      });

      it('should make all items uncheck and no tag is displayed', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateBackspaceInTextField();
          comp.forceUpdate(() => {
            simulateBackspaceInTextField();
            comp.forceUpdate(() => {
              simulateBackspaceInTextField();
              comp.forceUpdate(() => {
                expect(getAllCheckedCheckboxItems()).toEqual(['sub 1-1']); //One item should be checked
                expect(getAllTagLabels()).toEqual(['sub 1-1']);
                simulateBackspaceInTextField();
                comp.forceUpdate(() => {
                  expect(getAllCheckedCheckboxItems().length).toEqual(0); //No items should be checked
                  expect(getAllTagLabels().length).toEqual(0);
                  done();
                });
              });
            });
          });
        });
      });
    });

    describe('pressing x button on a tag', () => {
      it('should make the item unchecked', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateClickOnCloseTagButton('sub 2 (with sub items)');
          comp.forceUpdate(() => {
            const expectedCheckedItemsAfter = [
              'sub 1-1', 'sub 1-2', 'sub 3 (without sub items)'
            ];
            const expectedAllTagsAfter = expectedCheckedItemsAfter;

            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItemsAfter);
            expect(getAllTagLabels()).toEqual(expectedAllTagsAfter);
            done();
          });
        });
      });

      it('should make all items unchecked when unchecking allItems', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateCheckboxClicked(defaultAllItems);
          comp.forceUpdate(() => {
            expect(getAllTagLabels()).toEqual([defaultAllItems]);
            simulateClickOnCloseTagButton(defaultAllItems);
            comp.forceUpdate(() => {
              expect(getAllCheckedCheckboxItems().length).toEqual(0);
              expect(getAllTagLabels().length).toEqual(0);
              done();
            });
          });
        });
      });

      it('should make all sub items unchecked when unchecking a parent item', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateClickOnCloseTagButton('sub 2 (with sub items)');
          comp.forceUpdate(() => {
            const expectedTagList = ['sub 1-1', 'sub 1-2', 'sub 3 (without sub items)'];
            expect(getAllTagLabels()).toEqual(expectedTagList);

            const expectedCheckedItems = expectedTagList;
            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);
            done();
          });
        });
      });
    });

    describe('changing checkbox state', () => {
      //TODO: test fails because of a bug!
      // it('should make all items checked when checking last item', done => {
      //     comp = renderComp()
      //     clickInside()
      //     comp.forceUpdate(function () {
      //         simulateCheckboxClicked('sub 1-3 (with sub items)')
      //         comp.forceUpdate(function () {
      //             expect(getAllTagLabels()).toEqual([defaultAllItems])
      //
      //             const expectedCheckedItems = [
      //                 defaultAllItems, 'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2', 'sub 1-3 (with sub items)', 'sub 1-3-1',
      //                 'sub 2 (with sub items)', 'sub 3 (without sub items)'
      //             ]
      //             expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems)
      //             done()
      //         })
      //     })
      // })

      it('should make all sub items with the same state as the parent state when changing the parent state', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateCheckboxClicked('sub 2 (with sub items)');
          comp.forceUpdate(() => {
            const expectedTags = [
              'sub 1-1', 'sub 1-2', 'sub 3 (without sub items)'
            ];
            expect(getAllTagLabels()).toEqual(expectedTags);

            const expectedCheckedItems = expectedTags;
            expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems);
            done();
          });
        });
      });

      //TODO: test fails because of a bug! checking an item doesn't make a parent (of 2 or more levels) with the same state
      // it('should make parent with the same state as all of its sub items when changing sub item to mach its all siblings', done => {
      //     const value = [
      //         {label: 'section 1', value: '1', items:
      //             [
      //                 {label: 'sub 1 (with sub items)', value: '2', isExpand: true, checked: false, items: [
      //                     {label: 'sub 1-2', value: '2-2', checked: true, items: []},
      //                     {label: 'sub 1-3 (with sub items)', value: '2-3', isExpand: true, checked: false, items: [
      //                         {label: 'sub 1-3-1', value: '2-3-1', checked: false, items: []},
      //                         {label: 'sub 1-3-2', value: '2-3-2', checked: true, items: []}
      //
      //                     ]}
      //                 ]},
      //                 {label: 'sub 3 (without sub items)', value: '4', checked: false, items: []}
      //             ]
      //         }
      //     ]
      //
      //     comp = renderComp({value})
      //     clickInside()
      //     comp.forceUpdate(function () {
      //         simulateCheckboxClicked('sub 1-3-1')
      //         comp.forceUpdate(function () {
      //             expect(getAllTagLabels()).toEqual(['sub 1 (with sub items)'])
      //
      //             const expectedCheckedItems = [
      //                 'sub 1 (with sub items)', 'sub 1-2', 'sub 1-3 (with sub items)', 'sub 1-3-1', 'sub 1-3-2'
      //             ]
      //             expect(getAllCheckedCheckboxItems()).toEqual(expectedCheckedItems)
      //             done()
      //         })
      //     })
      // })

      it('should show an indeterminate state on a parent when changing state on one of sub items', done => {
        const value = [
          {label: 'section 1', value: '1', items:
          [
            {label: 'sub 1 (with sub items)', value: '2', isExpand: true, checked: true, items: [
                {label: 'sub 1-2', value: '2-2', checked: true, items: []},
                {label: 'sub 1-3', value: '2-3', checked: true, items: []}
            ]},
              {label: 'sub 3 (without sub items)', value: '4', checked: false, items: []}
          ]
          }
        ];
        comp = renderComp({value});
        clickInside();
        comp.forceUpdate(() => {
          expect(getCheckboxByLabel('sub 1 (with sub items)').props.indeterminate).not.toEqual(true);
          simulateCheckboxClicked('sub 1-3');
          comp.forceUpdate(() => {
            expect(getCheckboxByLabel('sub 1 (with sub items)').props.indeterminate).toEqual(true);
            done();
          });
        });
      });
    });

    describe('Tag list', () => {
      it('should show only allItems when all items are checked', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateCheckboxClicked(defaultAllItems);
          comp.forceUpdate(() => {
            expect(getAllTagLabels()).toEqual([defaultAllItems]);
            done();
          });
        });
      });

      it('should show nothing when all items are unchecked', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateCheckboxClicked(defaultAllItems);
          comp.forceUpdate(() => {
            simulateCheckboxClicked(defaultAllItems);
            comp.forceUpdate(() => {
              expect(getAllTagLabels().length).toBe(0);
              done();
            });
          });
        });
      });

      it('should show only parent item when parent item is selected', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          const expectedTagList = ['sub 1-1', 'sub 1-2', 'sub 2 (with sub items)', 'sub 3 (without sub items)'];
          expect(getAllTagLabels()).toEqual(expectedTagList);
          done();
        });
      });

      it('should show only relevant sub items without parent item when only some of the sub items are checked', done => {
        const value =
          [
            {label: 'section 1', value: '1', items:
            [
              {label: 'sub 1 (with sub items)', value: '2', isExpand: true, checked: false, items: [
                  {label: 'sub 1-1', value: '2-1', checked: true, items: []},
                  {label: 'sub 1-2', value: '2-2', checked: true, items: []},
                  {label: 'sub 1-3', value: '2-3', checked: false, items: []},
                  {label: 'sub 1-4', value: '2-4', checked: false, items: []}
              ]}
            ]
            }
          ];

        comp = renderComp({value});
        clickInside();
        comp.forceUpdate(() => {
          const expectedTagList = ['sub 1-1', 'sub 1-2'];
          expect(getAllTagLabels()).toEqual(expectedTagList);
          done();
        });
      });
    });

    describe('expanding items in tree view', () => {
      it('should show up arrow when item is expanded', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          expect(getAllArrowItems().length).toEqual(3);
          expect(getAllUpArrowItems().length).toEqual(3);
          done();
        });
      });

      it('should show down arrow when item is collapsed', done => {
        comp = renderComp({value: collapsedValue});
        clickInside();
        comp.forceUpdate(() => {
          expect(getAllArrowItems().length).toEqual(1);
          expect(getAllUpArrowItems().length).toEqual(0);
          done();
        });
      });

      it('should show arrow only when item has sub items', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          expect(getAllArrowItems().length).toEqual(3);
          done();
        });
      });

      it('should not show arrow on parent, which all their sub items are filtered out', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          setFilterText('sub 1 (with sub items)');
          comp.forceUpdate(() => {
            expect(getAllArrowItems().length).toEqual(0);
            done();
          });
        });
      });

      it('should make all items collapsed by default', done => {
        comp = renderComp({value: collapsedValue});
        clickInside();
        comp.forceUpdate(() => {
          expect(getAllArrowItems().length).toEqual(1);
          expect(getAllUpArrowItems().length).toEqual(0);
          expect(getAllCheckboxLabels()).toEqual([defaultAllItems, 'sub 1 (with sub items)', 'sub 2']);
          done();
        });
      });

      it('should expand only one level when pressing the arrow in collapse mode', done => {
        comp = renderComp({value: collapsedValue});
        clickInside();
        comp.forceUpdate(() => {
          simulateArrowClick('sub 1 (with sub items)');
          comp.forceUpdate(() => {
            expect(getAllArrowItems().length).toEqual(2);
            expect(getAllUpArrowItems().length).toEqual(1);
            expect(getAllCheckboxLabels()).toEqual([defaultAllItems, 'sub 1 (with sub items)', 'sub 1-1', 'sub 1-2', 'sub 1-3', 'sub 2']);
            done();
          });
        });
      });

      it('should collapse an item when pressing the arrow in expand mode', done => {
        comp = renderComp();
        clickInside();
        comp.forceUpdate(() => {
          simulateArrowClick('sub 1 (with sub items)');
          comp.forceUpdate(() => {
            expect(getAllArrowItems().length).toEqual(2);
            expect(getAllUpArrowItems().length).toEqual(1);
            expect(getAllCheckboxLabels()).toEqual([
              defaultAllItems, 'sub 1 (with sub items)', 'sub 2 (with sub items)', 'another sub 1-1',
              'sub 3 (without sub items)'
            ]);
            done();
          });
        });
      });

      it('should expand all previous hierarchy when re-expanding an item with multiple sub item levels', done => {
        const value = [
          {label: 'section', value: '1', items: [
            {label: 'main item', value: '2', isExpand: true, checked: false, items: [
              {label: 'sub 1', value: '2-1', isExpand: true, checked: false, items: [
                {label: 'sub 1-1', value: '2-1-1', isExpand: true, checked: false, items: [
                  {label: 'sub 1-1-1', value: '2-1-1-1', checked: false, items: []}
                ]}
              ]}
            ]}
          ]}
        ];

        comp = renderComp({value});
        clickInside();
        comp.forceUpdate(() => {
          const allCheckboxLabelsInExpandMode = [
            defaultAllItems, 'main item', 'sub 1', 'sub 1-1', 'sub 1-1-1'
          ];
          expect(getAllArrowItems().length).toEqual(3);
          expect(getAllUpArrowItems().length).toEqual(3);
          expect(getAllCheckboxLabels()).toEqual(allCheckboxLabelsInExpandMode);

          simulateArrowClick('main item');
          comp.forceUpdate(() => {
            expect(getAllArrowItems().length).toEqual(1);
            expect(getAllUpArrowItems().length).toEqual(0);
            expect(getAllCheckboxLabels()).toEqual([defaultAllItems, 'main item']);

            simulateArrowClick('main item');

            comp.forceUpdate(() => {
              expect(getAllArrowItems().length).toEqual(3);
              expect(getAllUpArrowItems().length).toEqual(3);
              expect(getAllCheckboxLabels()).toEqual(allCheckboxLabelsInExpandMode);
              done();
            });
          });
        });
      });

      it('should collapse items with no expand property', done => {
        const value = [
          {label: 'section', value: '1', items: [
            {label: 'main item', value: '2', isExpand: true, checked: false, items: [
              {label: 'sub 1', value: '2-1', checked: false, items: [
                {label: 'sub 1-1', value: '2-1-1', isExpand: true, checked: false, items: [
                  {label: 'sub 1-1-1', value: '2-1-1-1', checked: false, items: []}
                ]}
              ]}
            ]}
          ]}
        ];
        comp = renderComp({value});
        clickInside();
        comp.forceUpdate(() => {
          expect(getAllCheckboxLabels()).toEqual([defaultAllItems, 'main item', 'sub 1']);
          done();
        });
      });
    });
  });
  describe('max height', () => {
    it('should limit height of tag list when max height is defined in props', () => {
      comp = renderComp({maxHeight: 600});
      expect(comp.props.maxHeight).toEqual(600);
    });

    it('should not limit height of tag list when max height is not defined in props', () => {
      comp = renderComp();
      expect(get(comp.props, 'maxHeight')).toEqual(false);
    });
  });
  describe('no items found', () => {
    it('should show the noItemsFound text if defined', done => {
      comp = renderComp({noItemsFoundText: 'no items found'});
      clickInside();
      setFilterText('aaaaaa');

      comp.forceUpdate(() => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(comp, 'not-found-wrapper')).toBeDefined();
        done();
      });
    });

    it('should not show an noItemsFound text if not defined', done => {
      comp = renderComp();
      clickInside();
      setFilterText('aaaaaa');
      comp.forceUpdate(() => {
        expect(() => {
          ReactTestUtils.findRenderedDOMComponentWithClass(comp, 'not-found-wrapper');
        }).toThrow();
        done();
      });
    });
  });
});
