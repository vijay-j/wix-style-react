import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import {isClassExists} from '../../test/utils';

const testComponentDriverFactory = ({element, wrapper, component}) => {

  const testComponent = $(element).find('input')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(testComponent),
    isChecked: () => isClassExists(element, 'checked'),
    isDisabled: () => isClassExists(element, 'disabled'),
    isIndeterminate: () => $(element).find('.indeterminate').length === 1,
    hasError: () => isClassExists(element, 'hasError'),
    getLabel: () => element.textContent,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default testComponentDriverFactory;
