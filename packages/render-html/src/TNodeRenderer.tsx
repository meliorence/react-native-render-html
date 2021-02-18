import React from 'react';
import {
  TBlock,
  TEmpty,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import { Markers, TNodeRendererProps } from './shared-types';
import { getMarkersFromTNode } from './helpers/getMarkersFromTNode';
import { useSharedProps } from './context/SharedPropsProvider';

export type { TNodeRendererProps } from './shared-types';

const TNodeRenderer = function TNodeRenderer(
  props: Omit<TNodeRendererProps<any>, 'markers'> & { parentMarkers: Markers }
) {
  const { tnode } = props;
  const sharedProps = useSharedProps();
  const markers = getMarkersFromTNode(tnode, props.parentMarkers);
  const customMarkers = sharedProps.setMarkersForTNode(
    tnode,
    props.parentMarkers
  );
  const resolvedMarkers =
    markers && !customMarkers
      ? markers
      : !markers && customMarkers
      ? { ...props.parentMarkers, ...customMarkers }
      : markers && customMarkers
      ? ({ ...markers, ...customMarkers } as Markers)
      : null;
  const tnodeProps = {
    ...props,
    sharedProps,
    markers: resolvedMarkers || props.parentMarkers
  };
  if (tnode instanceof TBlock) {
    return React.createElement(TBlockRenderer, tnodeProps);
  }
  if (tnode instanceof TPhrasing) {
    return React.createElement(TPhrasingRenderer, tnodeProps);
  }
  if (tnode instanceof TText) {
    return React.createElement(TTextRenderer, tnodeProps);
  }
  if (tnode instanceof TEmpty && __DEV__) {
    if (tnode.isUnregistered) {
      console.warn(
        `There is no custom renderer registered for tag "${tnode.tagName}" which is not part of the HTML5 standard. The tag will not be rendered.` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array. If you do, register a custom renderer for this tag.'
      );
    } else {
      console.warn(
        `The "${tnode.tagName}" tag is a valid HTML element but is not handled by this library. You must register a custom renderer or plugin and make sure its content model is not set to "none".` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array.'
      );
    }
  }
  return null;
};

const defaultProps: Required<
  Pick<TNodeRendererProps<any>, 'propsFromParent'>
> = {
  propsFromParent: {
    collapsedMarginTop: null
  }
};

TNodeRenderer.defaultProps = defaultProps;

export default TNodeRenderer;
