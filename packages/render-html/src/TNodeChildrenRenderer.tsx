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

/**
 * A hook especially useful when one need to tamper with children in a custom
 * renderer. Should be used with {@link TChildrenRenderer}.
 *
 * @example
 * For example, a custom renderer which inserts ads in an article:
 *
 * ```tsx
 * function ArticleRenderer(props) {
 *   const { tnode, TDefaultRenderer, ...defaultRendererProps } = props;
 *   const tchildrenProps = useTNodeChildrenProps(props);
 *   const firstChildrenChunk = tnode.children.slice(0, 2);
 *   const secondChildrenChunk = tnode.children.slice(2, 4);
 *   const thirdChildrenChunk = tnode.children.slice(4, 5);
 *   return (
 *     <TDefaultRenderer tnode={tnode} {...defaultRendererProps}>
 *       <TChildrenRenderer {...tchildrenProps} tchildren={firstChildrenChunk} />
 *       {firstChildrenChunk.length === 2 ? <AdComponent /> : null}
 *       <TChildrenRenderer {...tchildrenProps} tchildren={secondChildrenChunk} />
 *       {secondChildrenChunk.length === 2 ? <AdComponent /> : null}
 *       <TChildrenRenderer {...tchildrenProps} tchildren={thirdChildrenChunk} />
 *     </TDefaultRenderer>
 *   );
 * };
 * ```
 */
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

const TNodeWithChildrenRenderer = function TNodeWithChildrenRenderer(
  props: TNodeChildrenRendererProps
) {
  return React.createElement(TChildrenRenderer, useTNodeChildrenProps(props));
};

/**
 * A component to render all children of a {@link TNode}.
 */
function TNodeChildrenRenderer(
  props: TNodeChildrenRendererProps
): ReactElement {
  if (props.tnode.type === 'text') {
    // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return props.tnode.data as unknown as ReactElement;
  }
  return React.createElement(TNodeWithChildrenRenderer, props);
}

/**
 * @ignore
 */
TNodeChildrenRenderer.defaultProps = tchildrenRendererDefaultProps;

export default TNodeChildrenRenderer;
