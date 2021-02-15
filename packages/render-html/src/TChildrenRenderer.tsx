import React from 'react';
import { TBlock, TNode, TPhrasing } from '@native-html/transient-render-engine';
import TNodeRenderer from './TNodeRenderer';
import { TChildrenRendererProps } from './shared-types';

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

const TChildrenRenderer = function TChildrenRenderer({
  tchildren,
  propsForChildren,
  disableMarginCollapsing,
  renderChild,
  parentMarkers
}: TChildrenRendererProps) {
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
    const propsFromParent = { ...propsForChildren, collapsedMarginTop };
    const childElement = React.createElement(TNodeRenderer, {
      parentMarkers,
      propsFromParent,
      tnode: childTnode,
      key: i
    });
    return typeof renderChild === 'function'
      ? renderChild({
          key: i,
          childElement,
          index: i,
          childTnode,
          propsFromParent
        })
      : childElement;
  });
  return <>{elements}</>;
};

export const tchildrenRendererDefaultProps: Pick<
  TChildrenRendererProps,
  'propsForChildren'
> = {
  propsForChildren: {}
};

TChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TChildrenRenderer;
