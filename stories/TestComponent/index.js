import React from 'react';

import {Languages} from 'wix-style-react/Icons';
import story from '../utils/Components/Story';

const labelExamples = [
  'Hello World!',
  <span key={0}>Hello <strong>World!</strong></span>,
  <span key={1}>Hello <Languages/></span>
];

story({
  category: '4. Selection',
  storyName: '4.4 TestComponent',
  componentSrcFolder: 'TestComponent',

  componentProps: setState => ({
    children: labelExamples[0],
    onChange: ({target: {checked}}) => setState({checked}),
    dataHook: 'storybook-testComponent'
  }),

  exampleProps: {
    children: labelExamples,
    onChange: ({target: {checked}}) => checked ? 'Checked' : 'Unchecked'
  }
});
