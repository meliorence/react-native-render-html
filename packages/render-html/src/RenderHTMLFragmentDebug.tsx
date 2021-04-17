import React, { Fragment } from 'react';
import { PropsWithChildren } from 'react';
import debugMessage from './debugMessages';
import { RenderHTMLFragmentProps } from './shared-types';

const RenderHTMLFragmentDebug = function RenderHTMLDebug(
  props: PropsWithChildren<RenderHTMLFragmentProps>
) {
  if (__DEV__) {
    if (typeof props.contentWidth !== 'number') {
      console.warn(debugMessage.contentWidth);
    }
    if (!props.source) {
      console.warn(debugMessage.noSource);
    }
    if ('html' in props) {
      console.warn(debugMessage.outdatedHtmlProp);
    }
    if ('uri' in props) {
      console.warn(debugMessage.outdatedUriProp);
    }
    if ('listsPrefixesRenderers' in props) {
      console.warn(debugMessage.outdatedListPrefixRenderersProps);
    }
    if ('imagesInitialDimensions' in props) {
      console.warn(debugMessage.outdatedImagesDimensions);
    }
  }
  return <Fragment>{props.children}</Fragment>;
};

export default RenderHTMLFragmentDebug;
