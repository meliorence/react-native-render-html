import React from 'react';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { TDefaultRenderer, TNodeSubRendererProps } from './shared-types';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import TDefaultTextualRenderer from './TDefaultTextualRenderer';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  children,
  ...props
}) => {
  const { tnode, markers: parentMarkers, propsForChildren } = props;
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const resolvedChildren =
    children ??
    React.createElement(TNodeChildrenRenderer, {
      parentMarkers,
      tnode,
      propsForChildren
    });
  return React.createElement(TDefaultTextualRenderer, props, resolvedChildren);
};

export default function TPhrasingRenderer(
  props: TNodeSubRendererProps<TPhrasing>
) {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultPhrasingRenderer
  );
  return React.createElement(Renderer, assembledProps);
}
