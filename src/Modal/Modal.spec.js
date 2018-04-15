import React from 'react';
import Modal from './Modal';
import ModalFactory from './Modal.driver';
import {createDriverFactory} from '../test-common';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {modalTestkitFactory} from '../../testkit';
import {modalTestkitFactory as enzymeMessageBoxTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Modal', () => {
  const createDriver = createDriverFactory(ModalFactory);

  let props = {};

  beforeEach(() => {
    document.body.innerHTML = ''; //remove previous modals from body
    props = {};
    props.isOpen = true;
    props.contentLabel = 'modal_' + Math.random();
  });

  describe('content', () => {

    it(`should not render the modal content if not open by default`, () => {
      props.isOpen = false;

      const driver = createDriver(<Modal {...props}>
        <div data-hook="inner-div"/>
      </Modal>);
      expect(driver.getChildBySelector('[data-hook="inner-div"]')).toBeNull();
    });

    it(`should render the passed children in the markup`, () => {
      props.isOpen = true;
      const driver = createDriver(<Modal {...props}>
        <div data-hook="inner-div"/>
      </Modal>);
      expect(driver.getChildBySelector('[data-hook="inner-div"]')).not.toBeNull();
    });

    describe('maxHeight', () => {
      it('should render maxHeight passed in props', () => {
        const driver = createDriver(<Modal {...props} scrollableContent maxHeight="calc(100vh - 48px)"/>);
        const driver2 = createDriver(<Modal {...props} scrollableContent={false} maxHeight="calc(100vh - 48px)"/>);
        expect(driver.getContentStyle().maxHeight).toBe('calc(100vh - 48px)');
        expect(driver2.getContentStyle().maxHeight).toBe('calc(100vh - 48px)');
      });

      it('should render 100vh maxHeight when maxHeight is set to auto and content is scrollable', () => {
        const driver = createDriver(<Modal {...props} scrollableContent maxHeight="auto"/>);
        expect(driver.getContentStyle().maxHeight).toBe('100vh');
      });

      it('content position should be relative', () => {
        const driver = createDriver(<Modal {...props}/>);
        expect(driver.getContentStyle().position).toBe('relative');
      });
    });

  });

  describe('callbacks', () => {
    it(`should trigger the onAfterOpen function`, () => {
      props.onAfterOpen = sinon.spy();

      createDriver(<Modal {...props}/>);
      expect(props.onAfterOpen.calledOnce).toBeTruthy();
    });

    it(`should trigger the onRequestClose function when clicking the overlay`, () => {

      props.onRequestClose = sinon.spy();
      props.shouldCloseOnOverlayClick = true;
      props.closeTimeoutMS = 0;

      const driver = createDriver(<Modal {...props}/>);
      driver.clickOnOverlay();

      expect(props.onRequestClose.calledOnce).toBeTruthy();
    });

    describe('timeout', () => {
      let originalTimeout;

      beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      });
      afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      });

      it(`should wait closeTimeoutMS before removing the modal`, done => {
        props.closeTimeoutMS = 400;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = props.closeTimeoutMS + 500;

        const driver = createDriver(<Modal {...props}/>);
        driver.setProps({
          isOpen: false
        });

        setTimeout(() => {
          expect(driver.isOpen()).toBeTruthy();
        }, props.closeTimeoutMS - 50);

        setTimeout(() => {
          expect(driver.isOpen()).toBeFalsy();
          done();
        }, props.closeTimeoutMS + 50);
      });
    });
  });

  describe('theme', () => {
    it('should set the theme by default to "blue"', () => {
      const driver = createDriver(<Modal {...props}/>);
      expect(driver.isThemeExist('blue')).toBeTruthy();
    });

    it('should allowing setting the theme', () => {
      props.theme = 'green';
      const driver = createDriver(<Modal {...props}/>);
      expect(driver.isThemeExist('green')).toBeTruthy();
      expect(driver.isThemeExist('blue')).toBeFalsy();
    });
  });

  describe('scrollable', () => {
    it('should be set to true by default', () => {
      const driver = createDriver(<Modal {...props}/>);
      expect(driver.isScrollable()).toBe(true);
    });
    it('should allow disabling the scrolling', () => {
      const driver = createDriver(<Modal {...props} scrollable={false}/>);
      expect(driver.isScrollable()).toBe(false);
    });
  });

  describe('appName', () => {
    it('should add aria-hidden body if appElement is not specified', () => {
      createDriver(<Modal {...props}/>);
      expect(document.getElementsByTagName('body')[0].getAttribute('aria-hidden')).toBe('true');
    });

    it('should add aria-hidden to selected element', () => {
      const appElemnt = document.createElement('div');
      appElemnt.setAttribute('id', 'app');
      document.body.appendChild(appElemnt);
      props.appElement = '#app';
      createDriver(<Modal {...props}/>);
      expect(appElemnt.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Modal {...props}/>, modalTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Modal {...props}/>, enzymeMessageBoxTestkitFactory, mount)).toBe(true);
    });
  });

});
