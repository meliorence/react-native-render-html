import React, { Fragment } from 'react';
import { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { RenderHTMLProps } from './shared-types';

function RenderHTMLProd(props: PropsWithChildren<RenderHTMLProps>) {
  return <Fragment>{props.children}</Fragment>;
}

function RenderHTMLDev(props: PropsWithChildren<RenderHTMLProps>) {
  useEffect(() => {
    if (typeof props.contentWidth !== 'number') {
      console.warn(
        'You should always pass contentWidth prop to properly handle screen rotations ' +
          'and have a seemless support for images scaling. ' +
          'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
          'layout will become inconsistent after screen rotations. ' +
          'You are encouraged to use useWindowDimensions hook, see: ' +
          'https://reactnative.dev/docs/usewindowdimensions'
      );
    }
  }, [props.contentWidth]);
  return <Fragment>{props.children}</Fragment>;
}

export default function RenderHTMLDebug(
  props: PropsWithChildren<RenderHTMLProps>
) {
  if (props.debug && __DEV__) {
    return React.createElement(RenderHTMLDev, props);
  }
  return React.createElement(RenderHTMLProd, props);
}
