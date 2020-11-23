import React from 'react';
import { TBlock, TNode, TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { TNodeRendererProps } from './TNodeRenderer';
import TChildrenRenderer, { TChildrenRendererProps } from './TChildrenRenderer';

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

export type TNodeChildrenRendererProps = {
  disableMarginCollapsing?: boolean;
} & Pick<TNodeRendererProps<TNode>, 'hasAnchorAncestor' | 'tnode'>;

export function useTNodeChildrenProps({
  tnode,
  hasAnchorAncestor,
  disableMarginCollapsing = false
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  return {
    hasAnchorAncestor: hasAnchorAncestor || tnode.tagName === 'a',
    disableMarginCollapsing: !shouldCollapseChildren,
    tchildren: tnode.children
  };
}

const TNodeChildrenRenderer: React.FunctionComponent<TNodeChildrenRendererProps> = function TNodeChildrenRenderer(
  props
) {
  return React.createElement(TChildrenRenderer, useTNodeChildrenProps(props));
};

export default TNodeChildrenRenderer;
