import eyes from 'eyes.it';
import {richTextAreaTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import {settings} from '../../stories/RichTextArea/RichTextArea.story';

const EDITOR_TAB_ORDINAL = 7;

describe('rich text area page', () => {
  const storyUrl = getStoryUrl(settings.category, settings.storyName);
  const richTextAreaTestkit = richTextAreaTestkitFactory({dataHook: settings.dataHook});

  const focusEditor = () => browser.actions().sendKeys([...Array(EDITOR_TAB_ORDINAL)].map(() => protractor.Key.TAB)).perform();

  beforeEach(() => {
    browser.get(storyUrl);
  });

  beforeEach(async () => {
    await waitForVisibilityOf(richTextAreaTestkit.element());
  });

  eyes.it('should render default props', async () => {
    expect(richTextAreaTestkit.isEditorFocused()).toBe(false, 'isEditorFocused');
  });

  eyes.it('should show focus styles', async () => {
    expect(await richTextAreaTestkit.isEditorFocused()).toBe(false);
    await focusEditor();
    expect(await richTextAreaTestkit.isEditorFocused()).toBe(true);
  });

});
