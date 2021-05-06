import React from 'react';
import { TNode } from '@native-html/transient-render-engine';
import TNodeRenderer from './TNodeRenderer';
import { TChildrenRendererProps } from './shared-types';
import getCollapsedMarginTop from './helpers/getCollapsedMarginTop';

function isCollapsible(tnode: TNode) {
  return tnode.type === 'block' || tnode.type === 'phrasing';
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
      collapsedMarginTop = getCollapsedMarginTop(tchildren[i - 1], childTnode);
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
