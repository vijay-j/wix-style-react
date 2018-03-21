import {isFocused} from '../test-common';

export const BUTTON_TYPES = ['bold', 'italic', 'underline', 'link', 'unordered-list', 'ordered-list'];

const richTextAreaDriverFactory = component => {

  return {
    element: () => component,
    isEditorFocused: () => isFocused(component.$('[data-slate-editor="true"]')),
    isButtonFocused: buttonIndex =>
      isFocused(component.$('[data-hook="toolbar"]')
      .$(`[data-hook="rich-text-area-button-${BUTTON_TYPES[buttonIndex]}"]`))

  };
};

export default richTextAreaDriverFactory;
