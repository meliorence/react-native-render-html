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

export type CollapsedMarginTop =  number | null

export interface TNodeGenericRendererProps<T extends TNode> {
  tnode: T;
  key?: string | number;
  renderTChildren: typeof renderTChildren;
  renderTNode: typeof renderTNode;
  defaultRenderers: typeof defaultRenderers;
  passedProps: RenderHTMLPassedProps;
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void;
  marginCollapsingEnabled: boolean;
  collapsedMarginTop: CollapsedMarginTop;
}

export type TNodeRendererProps<T extends TNode> = Omit<
  TNodeGenericRendererProps<T>,
  'renderTNode' | 'renderTChildren'
>;

function renderTNode(props: Omit<TNodeRendererProps<any>, 'defaultRenderers'>) {
  return React.createElement(TNodeRenderer, {
    ...props,
    defaultRenderers
  });
}

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

function getCollapsedMargins(
  precedent: TNode,
  current: TNode
): CollapsedMarginTop {
  const precedentMarginBottom =
    typeof precedent.styles.nativeBlockRet.marginBottom === 'number'
      ? precedent.styles.nativeBlockRet.marginBottom
      : null;
  const currentMarginBottom =
    typeof current.styles.nativeBlockRet.marginTop === 'number'
      ? current.styles.nativeBlockRet.marginTop
      : null;
  if (precedentMarginBottom == null || currentMarginBottom == null) {
    return null;
  }
  return Math.max(Math.abs(precedentMarginBottom - currentMarginBottom), 0);
}

function renderTChildren(
  tnode: TNode,
  childrenProps: Pick<
    TNodeRendererProps<any>,
    'marginCollapsingEnabled' | 'passedProps' | 'syntheticAnchorOnLinkPress'
  >
) {
  const shouldCollapseChildren =
    childrenProps.marginCollapsingEnabled && isCollapsible(tnode);
  let collapsedMarginTop: CollapsedMarginTop | null = null;
  return tnode.children.map((childTnode, i) => {
    if (
      shouldCollapseChildren &&
      isCollapsible(childTnode) &&
      i > 0 &&
      isCollapsible(tnode.children[i - 1])
    ) {
      collapsedMarginTop = getCollapsedMargins(tnode.children[i - 1], childTnode);
    }
    return renderTNode({
      ...childrenProps,
      tnode: childTnode,
      key: i,
      collapsedMarginTop
    });
  });
}

function TNodeRenderer(props: TNodeRendererProps<TNode>) {
  const {
    tnode,
    passedProps,
    syntheticAnchorOnLinkPress: inheritedSyntheticAnchorOnLinkPress
  } = props;
  const syntheticAnchorOnLinkPress =
    extractAnchorOnLinkPress(tnode, passedProps) ||
    inheritedSyntheticAnchorOnLinkPress;
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
