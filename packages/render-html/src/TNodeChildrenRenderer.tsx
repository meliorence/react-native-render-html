import React from 'react';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import TChildrenRenderer, {
  tchildrenRendererDefaultProps
} from './TChildrenRenderer';
import {
  TChildrenRendererProps,
  TNodeChildrenRendererProps
} from './shared-types';

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

export function useTNodeChildrenProps({
  tnode,
  propsForChildren,
  disableMarginCollapsing = false,
  renderChild,
  parentMarkers
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  return {
    propsForChildren,
    parentMarkers,
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
) {
  if (props.tnode instanceof TText) {
    return <>{props.tnode.data}</>;
  }
  return React.createElement(TNodeWithChildrenRenderer, props);
};

TNodeChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TNodeChildrenRenderer;
