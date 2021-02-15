import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { TDefaultRenderer, TNodeSubRendererProps } from './shared-types';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  tnode,
  key,
  style,
  children,
  textProps,
  markers,
  propsForChildren,
  onPress
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const resolvedStyles = textProps?.style ? [textProps.style, style] : style;
  const resolvedChildren = children ?? (
    <TNodeChildrenRenderer
      parentMarkers={markers}
      tnode={tnode}
      propsForChildren={propsForChildren}
    />
  );
  return React.createElement(
    Text,
    {
      key,
      ...textProps,
      onPress,
      style: resolvedStyles,
      testID: tnode.tagName || undefined
    },
    resolvedChildren
  );
};

const TPhrasingRenderer = (props: TNodeSubRendererProps<TPhrasing>) => {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultPhrasingRenderer
  );
  return React.createElement(Renderer, assembledProps);
};

export default TPhrasingRenderer;
