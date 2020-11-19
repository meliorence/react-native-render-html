import React from 'react';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-tree';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import defaultRenderers from './defaultRenderers';
import { RenderHTMLPassedProps } from './types';
import extractAnchorOnLinkPress from './extractAnchorOnLinkPress';
import { GestureResponderEvent } from 'react-native';

export interface TNodeGenericRendererProps<T extends TNode> {
  tnode: T;
  key?: string | number;
  renderTChildren: typeof renderTChildren;
  renderTNode: typeof renderTNode;
  defaultRenderers: typeof defaultRenderers;
  passedProps: RenderHTMLPassedProps;
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void;
}

export type TNodeRendererProps<T extends TNode> = Omit<
  TNodeGenericRendererProps<T>,
  'renderTNode' | 'renderTChildren'
>;

function renderTNode(
  tnode: TNode,
  passedProps: RenderHTMLPassedProps,
  key?: number | string,
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void
) {
  return (
    <TNodeRenderer
      passedProps={passedProps}
      defaultRenderers={defaultRenderers}
      tnode={tnode}
      key={key}
      syntheticAnchorOnLinkPress={syntheticAnchorOnLinkPress}
    />
  );
}

function renderTChildren(
  tnode: TNode,
  passedProps: RenderHTMLPassedProps,
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void
) {
  return tnode.children.map((childTnode, i) =>
    renderTNode(childTnode, passedProps, i, syntheticAnchorOnLinkPress)
  );
}

function TNodeRenderer(props: TNodeRendererProps<TNode>) {
  const { tnode, passedProps, syntheticAnchorOnLinkPress: inheritedSyntheticAnchorOnLinkPress } = props;
  const syntheticAnchorOnLinkPress = extractAnchorOnLinkPress(
    tnode,
    passedProps
  ) || inheritedSyntheticAnchorOnLinkPress;
  const childrenProps: TNodeGenericRendererProps<any> = {
    ...props,
    renderTChildren,
    renderTNode,
    defaultRenderers,
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
  if (props.passedProps.debug) {
    console.warn(
      `TNodeRenderer: node with tag ${props.tnode.tagName} has no corresponding renderer.`
    );
  }
  return null;
}

export default TNodeRenderer;
