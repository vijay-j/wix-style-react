import React from 'react';
import {node, bool} from 'prop-types';
import NavigationLinkLayout from '../core/navigation/LinkLayout';

class Link extends React.PureComponent {
  static defaultProps = {
    isActive: false,
  };

  static propTypes = {
    isActive: bool,
    children: node
  };

  render() {
    const {children, isActive, ...rest} = this.props;

    return (
      <NavigationLinkLayout isActive={isActive} {...rest}>
        {children}
      </NavigationLinkLayout>
    );
  }
}

export default Link;
