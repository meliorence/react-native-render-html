import React, { ReactElement } from 'react';
import { TNode } from '@native-html/transient-render-engine';
import TNodeRenderer from './TNodeRenderer';
import { TChildrenRendererProps } from './shared-types';
import collapseTopMarginForChild from './helpers/collapseTopMarginForChild';

const empty = {};

const mapCollapsibleChildren = (
  propsForChildren: TChildrenRendererProps['propsForChildren'],
  renderChild: TChildrenRendererProps['renderChild'],
  disableMarginCollapsing: boolean | undefined,
  childTnode: TNode,
  n: number,
  tchildren: readonly TNode[]
) => {
  const collapsedMarginTop = disableMarginCollapsing
    ? null
    : collapseTopMarginForChild(n, tchildren);
  const propsFromParent = { ...propsForChildren, collapsedMarginTop };
  const key = childTnode.nodeIndex;
  const childElement = React.createElement(TNodeRenderer, {
    propsFromParent,
    tnode: childTnode,
    key,
    renderIndex: n,
    renderLength: tchildren.length
  });
  return typeof renderChild === 'function'
    ? renderChild({
        key,
        childElement,
        index: n,
        childTnode,
        propsFromParent
      })
    : childElement;
};

export default function renderChildren({
  tchildren,
  propsForChildren = empty,
  disableMarginCollapsing,
  renderChild
}: TChildrenRendererProps): ReactElement {
  const elements = tchildren.map(
    mapCollapsibleChildren.bind(
      null,
      propsForChildren,
      renderChild,
      disableMarginCollapsing
    )
  );
  return <>{elements}</>;
}
