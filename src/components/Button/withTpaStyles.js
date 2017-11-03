import React from 'react';
import {object} from 'prop-types';
import {css} from 'glamor';

export function withTpaStyles(WrappedComponent) {
  const TpaStylesWrapper = (props, {wixTpaStyles}) => {
    let className = '';
    if (Object.keys(wixTpaStyles).length > 0) {
      const {color, backgroundColor, fontSize, borderColor} = wixTpaStyles;

      className = css({
        backgroundColor,
        color,
        fontSize,
        borderColor,
        ':hover': {
          backgroundColor,
          color: 'black',
          opacity: '0.5'
        }
      });
    }
    console.log('className', className);
    return <WrappedComponent {...{...props, className}}/>;
  };

  TpaStylesWrapper.contextTypes = {
    wixTpaStyles: object
  };

  return TpaStylesWrapper;
}
