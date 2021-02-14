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
  tchildrenRendererDefaultProps,
  TChildrenRendererProps
} from './TChildrenRenderer';
import { PropsFromParent } from './shared-types';

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

export type TNodeChildrenRendererProps = {
  disableMarginCollapsing?: boolean;
  renderChild?: (props: TChildProps) => ReactNode;
  propsFromParent: Partial<PropsFromParent>;
} & Pick<TNodeRendererProps<TNode>, 'tnode'>;

export function useTNodeChildrenProps({
  tnode,
  propsFromParent,
  disableMarginCollapsing = false,
  renderChild
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  return {
    propsFromParent,
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
