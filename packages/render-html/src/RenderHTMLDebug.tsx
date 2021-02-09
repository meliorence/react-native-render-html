import React, { Fragment } from 'react';
import { PropsWithChildren } from 'react';
import lookupRecord from './helpers/lookupRecord';
import { RenderHTMLProps } from './shared-types';

export function RenderHTMLProd(props: PropsWithChildren<RenderHTMLProps>) {
  return <Fragment>{props.children}</Fragment>;
}

export const messages = {
  outdatedUriProp:
    "You're attempting to use an outdated prop, 'uri'. This prop has been discontinued since version 6. " +
    "Use 'source={{ uri }}' instead.",
  outdatedHtmlProp:
    "You're attempting to use an outdated prop, 'html'. This prop has been discontinued since version 6. " +
    "Use 'source={{ html }}' instead.",
  noSource:
    'No source prop was provided to RenderHTML. Nothing will be rendered',
  contentWidth:
    'You should always pass contentWidth prop to properly handle screen rotations ' +
    'and have a seemless support for images scaling. ' +
    'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
    'layout will become inconsistent after screen rotations. ' +
    'You are encouraged to use useWindowDimensions hook, see: ' +
    'https://reactnative.dev/docs/usewindowdimensions'
};

const RenderHTMLDebug = function RenderHTMLDebug(
  props: PropsWithChildren<RenderHTMLProps>
) {
  if (__DEV__) {
    if (typeof props.contentWidth !== 'number') {
      console.warn(messages.contentWidth);
    }
    if (!props.source) {
      console.warn(messages.noSource);
    }
    if (lookupRecord(props, 'html')) {
      console.warn(messages.outdatedHtmlProp);
    }
    if (lookupRecord(props, 'uri')) {
      console.warn(messages.outdatedUriProp);
    }
  }
  return <Fragment>{props.children}</Fragment>;
};

export default RenderHTMLDebug;
