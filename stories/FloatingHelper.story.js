import React from 'react';
import FloatingHelper from 'wix-style-react/FloatingHelper';

export default {
  category: '8. Notification Bars',
  storyName: '8.6 FloatingHelper',
  component: FloatingHelper,
  componentPath: '../src/FloatingHelper',

  componentProps: {
    'data-hook': 'storybook-floating-helper',
    content: (
      <div> hello </div>
    ),
    children: <span>I am a FloatingHelper target</span>,
    placement: 'right'
  }
};


{/* <HelperContent
        title="Don’t forget to setup payments"
        body="In order to sell your music you need to choose a payment method."
        actionText="Ok, Take Me There"
        onActionClick={() => null}
        image={<Image width="102" height="102" viewBox="4 4 18 18"/>}
        /> */}

// import BaseFloatingHelperStory from 'wix-ui-backoffice/dist/stories/FloatingHelper/FloatingHelper.story';
// export default {
//   ...BaseFloatingHelperStory,
//   category: '8. Notification Bars',
//   storyName: '8.6 FloatingHelper'
// };

