import React, { ReactElement } from 'react';
import { TNode } from '@native-html/transient-render-engine';
import TNodeRenderer from './TNodeRenderer';
import { TChildrenRendererProps } from './shared-types';
import getCollapsedMarginTop from './helpers/getCollapsedMarginTop';

function isCollapsible(tnode: TNode) {
  return tnode.type === 'block' || tnode.type === 'phrasing';
}

/**
 * Compute top collapsed margin for the nth {@link TNode}-child of a list of
 * TNodes.
 *
 * @param n - The index for which the top margin should be collapsed.
 * @param tchildren - The list of {@link TNode} children.
 * @returns `null` when no margin collapsing should apply, a number otherwise.
 * @public
 */
export function collapseTopMarginForChild(
  n: number,
  tchildren: readonly TNode[]
): number | null {
  const childTnode = tchildren[n];
  if (isCollapsible(childTnode) && n > 0 && isCollapsible(tchildren[n - 1])) {
    return getCollapsedMarginTop(tchildren[n - 1], childTnode);
  }
  return null;
}

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
    key
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

/**
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 */
function TChildrenRenderer({
  tchildren,
  propsForChildren,
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

export const tchildrenRendererDefaultProps: Pick<
  TChildrenRendererProps,
  'propsForChildren'
> = {
  propsForChildren: {}
};

/**
 * @ignore
 */
TChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TChildrenRenderer;
