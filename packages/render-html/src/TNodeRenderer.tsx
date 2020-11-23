import React from 'react';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import extractAnchorOnLinkPress from './extractAnchorOnLinkPress';
import { useSharedProps } from './context/SharedPropsContext';
import { TNodeGenericRendererProps } from './shared-types';

export type TNodeRendererProps<T extends TNode> = Omit<
  TNodeGenericRendererProps<T>,
  'renderTNode' | 'renderTChildren'
>;

const TNodeRenderer: React.FunctionComponent<TNodeRendererProps<
  TNode
>> = function TNodeRenderer(props) {
  const { tnode, hasAnchorAncestor: isAnchorChild } = props;
  const { onLinkPress, debug } = useSharedProps();
  const syntheticAnchorOnLinkPress = extractAnchorOnLinkPress(
    tnode,
    onLinkPress
  );
  const childrenProps: TNodeGenericRendererProps<any> = {
    ...props,
    hasAnchorAncestor: isAnchorChild,
    syntheticAnchorOnLinkPress
  };
  if (tnode instanceof TBlock) {
    return React.createElement(TBlockRenderer, childrenProps);
  }
  if (tnode instanceof TPhrasing) {
    return React.createElement(
      TPhrasingRenderer,
      childrenProps as TNodeGenericRendererProps<any>
    );
  }
  if (tnode instanceof TText) {
    return React.createElement(
      TTextRenderer,
      childrenProps as TNodeGenericRendererProps<any>
    );
  }
  if (debug) {
    console.warn(
      `TNodeRenderer: node with tag ${props.tnode.tagName} has no corresponding renderer.`
    );
  }
  return null;
};

export default TNodeRenderer;
