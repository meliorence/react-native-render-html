import React, { ReactElement } from 'react';
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
): ReactElement | null {
  if (props.tnode.type === 'text') {
    // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return (props.tnode.data as unknown) as ReactElement;
  }
  return React.createElement(TNodeWithChildrenRenderer, props);
};

TNodeChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TNodeChildrenRenderer;
