import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {RadioButtonDriver} from 'stylable-components/dist/test-kit';

const radioButtonDriverFactory = ({element, wrapper, component}) => {
  const radio = new RadioButtonDriver(() => element);

  return {
    exists: () => !!element,
    check: () => ReactTestUtils.Simulate.change(radio.nativeElement),
    isChecked: () => radio.isChecked(),
    isDisabled: () => radio.isDisabled(),
    getLabel: () => radio.children[0].textContent,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default radioButtonDriverFactory;
