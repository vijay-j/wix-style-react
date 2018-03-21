
import {isFocused} from '../test-common';

const toggleSwitchDriverFactory = component => ({
  element: () => component,
  isFocused: async () => isFocused(component.$('textarea'))
});

export default toggleSwitchDriverFactory;
