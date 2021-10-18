import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { TDefaultRenderer } from './shared-types';
import { TNodeSubRendererProps } from './internal-types';
import GenericPressable from './GenericPressable';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import getNativePropsForTNode from './helpers/getNativePropsForTNode';

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  children: overridingChildren,
  ...props
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const children = overridingChildren ?? (
    <TNodeChildrenRenderer
      tnode={props.tnode}
      propsForChildren={props.propsForChildren}
    />
  );
  const nativeProps = getNativePropsForTNode(props);
  if (typeof nativeProps.onPress === 'function') {
    return React.createElement(GenericPressable, nativeProps, children);
  }
  return React.createElement(View, nativeProps, children);
};

const TBlockRenderer = (props: TNodeSubRendererProps<TBlock>) => {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultBlockRenderer
  );
  return React.createElement(Renderer, assembledProps);
};

export default TBlockRenderer;
