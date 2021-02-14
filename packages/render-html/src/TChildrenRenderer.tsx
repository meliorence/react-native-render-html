import React, { ReactElement, ReactNode } from 'react';
import { TBlock, TNode, TPhrasing } from '@native-html/transient-render-engine';
import TNodeRenderer from './TNodeRenderer';
import { PropsFromParent } from './shared-types';

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

export interface TChildProps {
  key: string | number;
  childElement: ReactElement;
  index: number;
  childTnode: TNode;
  propsFromParent: PropsFromParent;
}

export type TChildrenRendererProps = {
  disableMarginCollapsing?: boolean;
  tchildren: TNode[];
  renderChild?: (props: TChildProps) => ReactNode;
  propsFromParent: Partial<PropsFromParent>;
};

const TChildrenRenderer = function TChildrenRenderer({
  tchildren,
  propsFromParent,
  disableMarginCollapsing,
  renderChild
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
    const resolvedPropsFromParent = { ...propsFromParent, collapsedMarginTop };
    const childElement = React.createElement(TNodeRenderer, {
      propsFromParent: resolvedPropsFromParent,
      tnode: childTnode,
      key: i
    });
    return typeof renderChild === 'function'
      ? renderChild({
          key: i,
          childElement,
          index: i,
          childTnode,
          propsFromParent: resolvedPropsFromParent
        })
      : childElement;
  });
  return <>{elements}</>;
};

export const tchildrenRendererDefaultProps: Pick<
  TChildrenRendererProps,
  'propsFromParent'
> = {
  propsFromParent: {}
};

TChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TChildrenRenderer;
