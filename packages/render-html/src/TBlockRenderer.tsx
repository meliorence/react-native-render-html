import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { TDefaultRenderer, TNodeRendererProps } from './shared-types';
import GenericPressable from './GenericPressable';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  children: overridingChildren,
  markers,
  style,
  onPress,
  viewProps,
  propsForChildren,
  key
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const children = overridingChildren ?? (
    <TNodeChildrenRenderer
      parentMarkers={markers}
      tnode={tnode}
      propsForChildren={propsForChildren}
    />
  );
  const commonProps = {
    ...viewProps,
    style: viewProps?.style ? [viewProps.style, style] : style,
    key,
    testID: tnode.tagName || undefined
  };
  if (typeof onPress === 'function') {
    return React.createElement(
      GenericPressable,
      { onPress, ...commonProps },
      children
    );
  }
  return React.createElement(View, commonProps, children);
};

const TBlockRenderer = (props: TNodeRendererProps<TBlock>) => {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultBlockRenderer
  );
  return React.createElement(Renderer, assembledProps);
};

export default TBlockRenderer;
