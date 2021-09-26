import React, { Fragment, PropsWithChildren } from 'react';
import debugMessage from './debugMessages';
import { RenderHTMLProps } from './shared-types';

const RenderHTMLDebug = function RenderHTMLDebug(
  props: PropsWithChildren<RenderHTMLProps>
) {
  if (typeof __DEV__ === 'boolean' && __DEV__) {
    if (typeof props.contentWidth !== 'number') {
      console.warn(debugMessage.contentWidth);
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
    if ('onLinkPress' in props) {
      console.warn(debugMessage.outdatedOnLinkPressProp);
    }
    if ('enableExperimentalPercentWidth' in props) {
      console.warn(debugMessage.outdatedEnableExperimentalPercentWidth);
    }
    if ('ignoreNodesFunction' in props) {
      console.warn(debugMessage.outdatedIgnoreNodesFunction);
    }
    if ('alterNode' in props) {
      console.warn(debugMessage.outdatedAlterNode);
    }
    if ('alterChildren' in props) {
      console.warn(debugMessage.outdatedAlterChildren);
    }
    if ('alterData' in props) {
      console.warn(debugMessage.outdatedAlterData);
    }
    if ('computeImagesMaxWidth' in props) {
      console.warn(debugMessage.outdatedComputeImagesMaxWidth);
    }
    if ('triggerTREInvalidationPropNames' in props) {
      console.warn(debugMessage.outdatedTriggerTREInvalidation);
    }
    if (Array.isArray(props.allowedStyles)) {
      props.allowedStyles.forEach((s) => {
        if (s.indexOf('-') > -1) {
          console.warn(
            `Style property '${s}' of 'allowedStyles' prop array must be camelCased.`
          );
        }
      });
    }
    if (Array.isArray(props.ignoredStyles)) {
      props.ignoredStyles.forEach((s) => {
        if (s.indexOf('-') > -1) {
          console.warn(
            `Style property '${s}' of 'ignoredStyles' prop array must be camelCased.`
          );
        }
      });
    }
  }
  return <Fragment>{props.children}</Fragment>;
};

export default RenderHTMLDebug;
