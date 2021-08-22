import React from 'react';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { TDefaultRenderer } from './shared-types';
import { TNodeSubRendererProps } from './internal-types';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import TDefaultTextualRenderer from './TDefaultTextualRenderer';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  children,
  ...props
}) => {
  const { tnode, propsForChildren } = props;
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const resolvedChildren =
    children ??
    React.createElement(TNodeChildrenRenderer, {
      tnode,
      propsForChildren
    });
  return React.createElement(TDefaultTextualRenderer, props, resolvedChildren);
};

function InnerTPhrasingRenderer(props: TNodeSubRendererProps<TPhrasing>) {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultPhrasingRenderer
  );
  return React.createElement(Renderer, assembledProps);
}

export default function TPhrasingRenderer(
  props: TNodeSubRendererProps<TPhrasing>
) {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  // When a TPhrasing node is anonymous and has only one child, its
  // rendering amounts to rendering its only child.
  if (
    props.sharedProps.bypassAnonymousTPhrasingNodes &&
    props.tnode.tagName == null &&
    props.tnode.children.length <= 1
  ) {
    return React.createElement(TNodeChildrenRenderer, {
      tnode: props.tnode
    });
  }
  return React.createElement(InnerTPhrasingRenderer, props);
}
