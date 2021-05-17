import React, { ReactNode } from 'react';
import { TNode } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsProvider';
import TChildrenRenderer, {
  tchildrenRendererDefaultProps
} from './TChildrenRenderer';
import {
  TChildrenRendererProps,
  TNodeChildrenRendererProps
} from './shared-types';

function isCollapsible(tnode: TNode) {
  return tnode.type === 'block' || tnode.type === 'phrasing';
}

export function useTNodeChildrenProps({
  tnode,
  propsForChildren,
  disableMarginCollapsing = false,
  renderChild
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  return {
    propsForChildren,
    disableMarginCollapsing: !shouldCollapseChildren,
    tchildren: tnode.children,
    renderChild
  };
}

const TNodeWithChildrenRenderer = function TNodeChildrenRenderer(
  props: TNodeChildrenRendererProps
) {
  return React.createElement(TChildrenRenderer, useTNodeChildrenProps(props));
};

const TNodeChildrenRenderer = function TNodeChildrenRenderer(
  props: TNodeChildrenRendererProps
): ReactNode {
  if (props.tnode.type === 'text') {
    return props.tnode.data;
  }
  return React.createElement(TNodeWithChildrenRenderer, props);
};

TNodeChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TNodeChildrenRenderer;
