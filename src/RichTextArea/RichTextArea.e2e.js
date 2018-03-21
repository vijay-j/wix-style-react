import eyes from 'eyes.it';
import {richTextAreaTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import {settings} from '../../stories/RichTextArea/RichTextArea.story';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

const EDITOR_TAB_ORDINAL = 7;

describe('rich text area page', () => {
  const storyUrl = getStoryUrl(settings.category, settings.storyName);
  const richTextAreaTestkit = richTextAreaTestkitFactory({dataHook: settings.dataHook});

  const pressTab = times => browser.actions().sendKeys([...Array(times)].map(() => protractor.Key.TAB)).perform();
  const focusEditor = () => pressTab(EDITOR_TAB_ORDINAL);

  // TODO: We can change this to beforeAll (to make the test go faster),
  // after we have a way to reset the focus before Each test.
  beforeEach(() => {
    browser.get(storyUrl);
  });

  beforeEach(async() => {
    await waitForVisibilityOf(richTextAreaTestkit.element());
  });

  eyes.it('should render default props', async () => {
    expect(richTextAreaTestkit.isEditorFocused()).toBe(false, 'isEditorFocused');
    for (let i = 0; i < 6; i++) {
      expect(richTextAreaTestkit.isButtonFocused(i)).toBe(false, 'isButtonFocused');
    }
  });

  describe('Focus', () => {

    eyes.it('should show focus styles for editor', async () => {
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(false);
      await focusEditor();
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(true);
    });

    eyes.it('should show focus styles for first button', async () => {
      for (let i = 0; i < 6; i++) {
        expect(await richTextAreaTestkit.isButtonFocused(i)).toBe(false);
        await pressTab(1);
        expect(await richTextAreaTestkit.isButtonFocused(i)).toBe(true);
      }
    });
  });

  describe('Focus+Error', () => {
    beforeEach(async () => {
      await autoExampleDriver.setProps({error: true});
    });

    eyes.it('should show focus styles for editor', async () => {
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(false);
      await focusEditor();
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(true);
    });

    eyes.it('should show focus styles for first button', async () => {
      for (let i = 0; i < 6; i++) {
        expect(await richTextAreaTestkit.isButtonFocused(i)).toBe(false);
        await pressTab(1);
        expect(await richTextAreaTestkit.isButtonFocused(i)).toBe(true);
      }
    });
  });

});
