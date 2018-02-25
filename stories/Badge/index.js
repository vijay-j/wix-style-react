import React from 'react';
import {storiesOf} from '@storybook/react';
import Badge from 'wix-style-react/Badge';
import {Facebook} from 'wix-style-react/Icons';

class ControlledBadgeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {skin: 'default', type: 'solid'};
  }
  render() {
    return(
      <div>
        skin: <input value={this.state.skin} onChange={e => this.setState({skin: e.target.value})}/><br/><br/>
        type: <input value={this.state.type} onChange={e => this.setState({type: e.target.value})}/><br/><br/>
        <Badge skin={this.state.skin} type={this.state.type} prefixIcon={<Facebook/>} data-hook="storybook-badge">
          I'M A BADGE!
        </Badge>
      </div>
    );
  }
}

  storiesOf('12. Other', module)
  .add('12.1 Badge', () =>
    <div>
      <ControlledBadgeExample/>
    </div>
  );
