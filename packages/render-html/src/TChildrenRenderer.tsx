import React from 'react';
import { TBlock, TNode, TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import TNodeRenderer, { TNodeRendererProps } from './TNodeRenderer';

function isCollapsible(tnode: TNode) {
  return tnode instanceof TBlock || tnode instanceof TPhrasing;
}

function getCollapsedMargins(precedent: TNode, current: TNode): null | number {
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

const TChildrenRenderer: React.FunctionComponent<
  {
    disableMarginCollapsing?: boolean;
  } & Pick<TNodeRendererProps<TNode>, 'syntheticAnchorOnLinkPress' | 'tnode'>
> = function TChildrenRenderer({
  tnode,
  syntheticAnchorOnLinkPress,
  disableMarginCollapsing = false
}) {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);
  let collapsedMarginTop: number | null = null;
  const children = tnode.children.map((childTnode, i) => {
    if (
      shouldCollapseChildren &&
      isCollapsible(childTnode) &&
      i > 0 &&
      isCollapsible(tnode.children[i - 1])
    ) {
      collapsedMarginTop = getCollapsedMargins(
        tnode.children[i - 1],
        childTnode
      );
    }
    return React.createElement(TNodeRenderer, {
      syntheticAnchorOnLinkPress,
      tnode: childTnode,
      key: i,
      collapsedMarginTop
    });
  });
  return <>{children}</>;
};

export default TChildrenRenderer;
