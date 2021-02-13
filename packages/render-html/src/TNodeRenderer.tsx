import React from 'react';
import {
  TBlock,
  TEmpty,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import { TNodeRendererProps } from './shared-types';

export type { TNodeRendererProps } from './shared-types';

const TNodeRenderer = function TNodeRenderer(props: TNodeRendererProps<TNode>) {
  const { tnode, hasAnchorAncestor } = props;
  const childrenProps: TNodeRendererProps<any> = {
    ...props,
    hasAnchorAncestor
  };
  if (tnode instanceof TBlock) {
    return React.createElement(TBlockRenderer, childrenProps);
  }
  if (tnode instanceof TPhrasing) {
    return React.createElement(TPhrasingRenderer, childrenProps);
  }
  if (tnode instanceof TText) {
    return React.createElement(TTextRenderer, childrenProps);
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
  Pick<TNodeRendererProps<any>, 'hasAnchorAncestor' | 'collapsedMarginTop'>
> = {
  hasAnchorAncestor: false,
  collapsedMarginTop: null
};

TNodeRenderer.defaultProps = defaultProps;

export default TNodeRenderer;
