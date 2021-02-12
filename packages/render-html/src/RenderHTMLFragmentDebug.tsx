import React, { Fragment } from 'react';
import { PropsWithChildren } from 'react';
import lookupRecord from './helpers/lookupRecord';
import { RenderHTMLFragmentProps } from './shared-types';

export const messages = {
  outdatedUriProp:
    "You're attempting to use an outdated prop, 'uri'. This prop has been discontinued in version 6. " +
    "Use 'source={{ uri }}' instead.",
  outdatedHtmlProp:
    "You're attempting to use an outdated prop, 'html'. This prop has been discontinued in version 6. " +
    "Use 'source={{ html }}' instead.",
  outdatedListPrefixRenderersProps:
    "You're attempting to use an outdated prop, 'listPrefixRenderers'. This prop has been discontinued in version 6.",
  noSource:
    'No source prop was provided to RenderHTML. Nothing will be rendered',
  contentWidth:
    'You should always pass contentWidth prop to properly handle screen rotations ' +
    'and have a seamless support for images scaling. ' +
    'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
    'layout will become inconsistent after screen rotations. ' +
    'You are encouraged to use useWindowDimensions hook, see: ' +
    'https://reactnative.dev/docs/usewindowdimensions'
};

const RenderHTMLFragmentDebug = function RenderHTMLDebug(
  props: PropsWithChildren<RenderHTMLFragmentProps>
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
    if (lookupRecord(props, 'listsPrefixesRenderers')) {
      console.warn(messages.outdatedListPrefixRenderersProps);
    }
  }
  return <Fragment>{props.children}</Fragment>;
};

export default RenderHTMLFragmentDebug;
