import React from 'react';
import {string} from 'prop-types';
import {mount} from 'enzyme';
import WixStyleProvider, {withTheme} from './index';

class Component extends React.Component {
  static propTypes = {
    theme: string
  };

  render() {
    const {theme} = this.props;
    return <div id="component">{`Theme is ${theme}`}</div>;
  }
}

const WrappedComponent = withTheme(Component);

describe('WixStyleProvider', () => {
  it('should render the wrapped component with the correct theme', () => {
    const theme = 'backoffice';
    const children = 'Theme is ' + theme;

    const wrapper = mount(
      <WixStyleProvider theme={theme}>
        <WrappedComponent/>
      </WixStyleProvider>
      );

    expect(wrapper.html()).toBe(`<div id="component">${children}</div>`);
    expect(wrapper.text()).toBe(children);
  });
});
