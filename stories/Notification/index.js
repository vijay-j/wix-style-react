import React from 'react';

import story from '../utils/Components/Story';
import Notification from '../../src/Notification';

const TextLabel = <Notification.TextLabel key="0">Hello</Notification.TextLabel>;
const ActionButton = <Notification.ActionButton key="1">Click Me!</Notification.ActionButton>;
const CloseButton = <Notification.CloseButton key="2"/>;

const possibleChildren = {
  all: [TextLabel, ActionButton, CloseButton],
  onlyTextLabel: TextLabel,
  withActionButton: [TextLabel, ActionButton],
  withCloseButton: [TextLabel, CloseButton]
};

story({
  category: '8. Notification Bars',
  storyName: '8.1 Notification',
  componentSrcFolder: 'Notification',

  componentProps: (setProps, getProps) => ({
    children: possibleChildren.all,
    show: true,
    onClose: () => setProps({show: false}),
    dataHook: 'storybook-notification'
  }),

  exampleProps: {
    timeout: 0
  }
});
