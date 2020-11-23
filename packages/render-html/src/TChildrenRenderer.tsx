import React from 'react';
import { TBlock, TNode, TPhrasing } from '@native-html/transient-render-engine';
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

export type TChildrenRendererProps = {
  disableMarginCollapsing?: boolean;
  tchildren: TNode[];
} & Pick<TNodeRendererProps<TNode>, 'hasAnchorAncestor'>;

const TChildrenRenderer: React.FunctionComponent<TChildrenRendererProps> = function TChildrenRenderer({
  tchildren,
  hasAnchorAncestor,
  disableMarginCollapsing
}) {
  let collapsedMarginTop: number | null = null;
  const elements = tchildren.map((childTnode, i) => {
    if (
      !disableMarginCollapsing &&
      isCollapsible(childTnode) &&
      i > 0 &&
      isCollapsible(tchildren[i - 1])
    ) {
      collapsedMarginTop = getCollapsedMargins(tchildren[i - 1], childTnode);
    }
    return React.createElement(TNodeRenderer, {
      collapsedMarginTop,
      hasAnchorAncestor: hasAnchorAncestor,
      tnode: childTnode,
      key: i
    });
  });
  return <>{elements}</>;
};

export default TChildrenRenderer;
