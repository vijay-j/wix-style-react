import eyes from 'eyes.it';
import {inputAreaTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('input area page', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.2 + InputArea');
  const inputAreaTestkit = inputAreaTestkitFactory({dataHook: 'storybook-inputarea'});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  beforeEach(async() => {
    await autoExampleDriver.reset();
    await waitForVisibilityOf(inputAreaTestkit.element());
  });

  eyes.it('should render default props', () => {
    expect(inputAreaTestkit.isFocused()).toBe(false, 'isFocused');
  });

  // Skiped until storybook supported withExampled url parameter
  // When removing `skip`, then add eyes.
  xit('should show focus styles', async () => {
    expect(inputAreaTestkit.isFocused()).toBe(false);
    await browser.actions().sendKeys(protractor.Key.TAB).perform();
    expect(inputAreaTestkit.isFocused()).toBe(true);
  });

});
