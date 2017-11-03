import React from 'react';
import WixStyleProvider from '../../../src/providers/WixStyleProvider';
import {storiesOf} from '@storybook/react';
import Button from '../../../src/components/Button';

const wixTpaStyles = {
  color: 'green',
  backgroundColor: 'pink',
  fontSize: '30px',
  borderColor: 'black'
};

storiesOf('Core', module)
  .add('Button', () => (
    <WixStyleProvider theme="backoffice" wixTpaStyles={wixTpaStyles}>
      <div>
        <Button onClick={() => console.log('1')}>Hello</Button><br/><br/>
        <Button onClick={() => console.log('2')}>Hey</Button>
      </div>
    </WixStyleProvider>
  ));
