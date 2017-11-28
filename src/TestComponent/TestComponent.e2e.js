import eyes from 'eyes.it';
import {testComponentTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from '../../stories/utils/Components/AutoExample/protractor.driver';

describe('TestComponent', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.2 TestComponent');
  const testComponentDriver = testComponentTestkitFactory({dataHook: 'storybook-testComponent'});

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should toggle state when clicked', () => {
    waitForVisibilityOf(testComponentDriver.element(), 'Cannot find TestComponent')
      .then(() => {
        autoExampleDriver.setProps({checked: true});
        expect(testComponentDriver.isChecked()).toBe(true);

        autoExampleDriver.setProps({checked: false});
        expect(testComponentDriver.isChecked()).toBe(false);
      });
  });
});
