import React from 'react';
import {func, node, string, bool, oneOf} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import classNames from 'classnames';
import {withTheme} from '../../providers/WixStyleProvider';
import {withTpaStyles} from './withTpaStyles';

class Button extends WixComponent {
  static propTypes = {
    children: node,
    id: string,
    prefixIcon: node,
    suffixIcon: node,
    type: string,
    onClick: func,
    onMouseEnter: func,
    onMouseLeave: func,
    active: bool,
    disabled: bool,
    height: oneOf(['small', 'medium', 'large']),
    hover: bool,
    classname: string,
    skin: oneOf([
      'transparent',
      'fullred',
      'fullgreen',
      'fullpurple',
      'emptyred',
      'emptygreen',
      'emptybluesecondary',
      'emptyblue',
      'emptypurple',
      'fullblue',
      'login',
      'emptylogin',
      'transparentblue',
      'whiteblue',
      'whiteblueprimary',
      'whitebluesecondary',
      'close-standard',
      'close-dark',
      'close-transparent',
      'icon-greybackground',
      'icon-standard',
      'icon-standardsecondary',
      'icon-white',
      'icon-whitesecondary'
    ])
  }

  static defaultProps = {
    height: 'medium',
    skin: 'fullblue'
  }

  constructor(props) {
    super(props);
    this.styles = require(`./themes/Button-${props.theme}.scss`);
    this.addPrefix = this.addPrefix.bind(this);
    this.addSuffix = this.addSuffix.bind(this);
    this.addIcon = this.addIcon.bind(this);
  }

  addIcon(className, icon, height) {
    const iconSize = height === 'small' ? '8px' : height === 'medium' ? '12px' : '16px';
    const dataHook = className === this.styles.prefix ? 'btn-prefix' : 'btn-suffix';
    return (
      icon ?
        <div className={className} data-hook={dataHook}>
          {React.cloneElement(icon, {size: iconSize})}
        </div> :
        null
    );
  }

  addPrefix() {
    return this.addIcon(this.styles.prefix, this.props.prefixIcon, this.props.height);
  }

  addSuffix() {
    return this.addIcon(this.styles.suffix, this.props.suffixIcon, this.props.height);
  }

  render() {
    const {disabled, onClick, children, type, onMouseEnter, onMouseLeave, skin, hover, active, height} = this.props;

    const className = classNames({
      [this.styles.button]: true,
      [this.styles[skin]]: true,
      [this.styles.hover]: hover,
      [this.styles.active]: active,
      [this.styles.disabled]: disabled,
      [this.styles[`height${height}`]]: height !== 'medium'
    });

    return (
      <button
        className={`${className} ${this.props.className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        {this.addPrefix()}
        {children}
        {this.addSuffix()}
      </button>
    );
  }
}

Button.displayName = 'Button';

export default withTheme(withTpaStyles(Button));
