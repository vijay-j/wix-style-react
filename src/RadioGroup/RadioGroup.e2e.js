import eyes from 'eyes.it';
import {radioGroupTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('RadioGroup', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.3 Radio Button Group');
  const dataHook = 'storybook-radiogroup';
  const radioGroupDriver = radioGroupTestkitFactory({dataHook});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  afterEach(() => {
    autoExampleDriver.reset();
  });

  eyes.it('should select the second option in a group', () => {
    waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
      .then(() => {
        radioGroupDriver.selectByIndex(1).click();
        expect(radioGroupDriver.isRadioChecked(1)).toBe(true);
      });
  });

  eyes.it('should not select disabled option', () => {
    autoExampleDriver.setProps({disabledRadios: [4]});

    waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
      .then(() => {
        expect(radioGroupDriver.isRadioDisabled(3)).toBe(true);
        browser.actions().mouseMove(radioGroupDriver.getRadioAtIndex(3)).click();
        expect(radioGroupDriver.isRadioChecked(3)).toBe(false);
      });
  });

  describe('Focus tests', () => {

    const pressTab = () => browser.actions().sendKeys(protractor.Key.TAB).perform();

    beforeEach(() => {
      // Needed in order to reset the focus state
      browser.get(storyUrl);
    });

    eyes.it('should focus on first item (not-selected)', () => {
      waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
        .then(async () => {
          expect(radioGroupDriver.isRadioFocused(0)).toBe(false);
          await pressTab();
          expect(radioGroupDriver.isRadioFocused(0)).toBe(true);
        });
    });

    eyes.it('should focus on first item (selected)', () => {
      autoExampleDriver.setProps({value: 1});
      waitForVisibilityOf(radioGroupDriver.element(), 'Cannot find RadioGroup')
        .then(async () => {
          expect(radioGroupDriver.isRadioChecked(0)).toBe(true);
          expect(radioGroupDriver.isRadioFocused(0)).toBe(false);
          await pressTab();
          expect(radioGroupDriver.isRadioFocused(0)).toBe(true);
        });
    });
  });
});

