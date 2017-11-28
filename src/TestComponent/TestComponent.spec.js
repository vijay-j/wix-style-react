import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import testComponentDriverFactory from './TestComponent.driver';
import {createDriverFactory} from '../test-common';
import {testComponentTestkitFactory} from '../../testkit';
import TestComponent from './TestComponent';
import {testComponentTestkitFactory as enzymeTestComponentTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('TestComponent', () => {
  const createDriver = createDriverFactory(testComponentDriverFactory);

  it('should be unchecked and not disabled by default', () => {
    const driver = createDriver(<TestComponent/>);
    expect(driver.isChecked()).toBeFalsy();
    expect(driver.isDisabled()).toBeFalsy();
  });

  it('should be checked', () => {
    const driver = createDriver(<TestComponent checked/>);
    expect(driver.isChecked()).toBeTruthy();
  });

  it('should be disabled', () => {
    const driver = createDriver(<TestComponent disabled/>);
    expect(driver.isDisabled()).toBeTruthy();
  });

  it('should have an error state', () => {
    const driver = createDriver(<TestComponent hasError/>);
    expect(driver.hasError()).toBeTruthy();
  });

  it('should have a label', () => {
    const driver = createDriver(<TestComponent disabled>Hey</TestComponent>);
    expect(driver.getLabel()).toBe('Hey');
  });

  it('should call onChange when clicking the TestComponent', () => {
    const onChange = jest.fn();

    const driver = createDriver(<TestComponent onChange={onChange}/>);

    driver.click();
    expect(onChange).toBeCalled();
  });

  it('should not call onChange when clicking disabled TestComponent', () => {
    const onChange = jest.fn();

    const driver = createDriver(<TestComponent onChange={onChange} disabled/>);

    driver.click();
    expect(onChange).not.toBeCalled();
  });

  it('should not run in indeterminate mode when not specified', () => {
    const driver = createDriver(<TestComponent/>);

    expect(driver.isIndeterminate()).toBeFalsy();
  });

  it('should run in indeterminate mode when specified', () => {
    const driver = createDriver(<TestComponent indeterminate/>);

    expect(driver.isIndeterminate()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><TestComponent dataHook={dataHook}/></div>));
      const testComponentTestkit = testComponentTestkitFactory({wrapper, dataHook});
      expect(testComponentTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<TestComponent dataHook={dataHook}/>);
      const testComponentTestkit = enzymeTestComponentTestkitFactory({wrapper, dataHook});
      expect(testComponentTestkit.exists()).toBeTruthy();
    });
  });
});
