import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';

import {Label} from 'wix-ui-backoffice/Label';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

const children = 'Hello World!';

export default {
  category: '1. Foundation',
  storyName: '1.2 + Label',

  component: Label,
  componentPath: '../../src/Label',
  componentProps: {
    children
  },

  exampleProps: {
    children,
    size: 'medium'
  },

  examples: (
    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard/>
    </CodeExample>
  )
};
