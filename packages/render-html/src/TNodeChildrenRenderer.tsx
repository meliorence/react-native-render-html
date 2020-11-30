import React, { ReactNode } from 'react';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { TNodeRendererProps } from './TNodeRenderer';
import TChildrenRenderer, {
  TChildProps,
  TChildrenRendererProps
} from './TChildrenRenderer';

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

export type TNodeChildrenRendererProps = {
  disableMarginCollapsing?: boolean;
  renderChild?: (props: TChildProps) => ReactNode;
} & Pick<TNodeRendererProps<TNode>, 'hasAnchorAncestor' | 'tnode'>;

export function useTNodeChildrenProps({
  tnode,
  hasAnchorAncestor,
  disableMarginCollapsing = false,
  renderChild
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  return {
    hasAnchorAncestor: hasAnchorAncestor || tnode.tagName === 'a',
    disableMarginCollapsing: !shouldCollapseChildren,
    tchildren: tnode.children,
    renderChild
  };
}

const TNodeWithChildrenRenderer: React.FunctionComponent<TNodeChildrenRendererProps> = function TNodeChildrenRenderer(
  props
) {
  return React.createElement(TChildrenRenderer, useTNodeChildrenProps(props));
};

const TNodeChildrenRenderer: React.FunctionComponent<TNodeChildrenRendererProps> = function TNodeChildrenRenderer(
  props
) {
  if (props.tnode instanceof TText) {
    return <>{props.tnode.data}</>;
  }
  return React.createElement(TNodeWithChildrenRenderer, props);
};

export default TNodeChildrenRenderer;
