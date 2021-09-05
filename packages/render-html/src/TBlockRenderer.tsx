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
  onPress,
  ...props
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const children = overridingChildren ?? (
    <TNodeChildrenRenderer
      tnode={props.tnode}
      propsForChildren={props.propsForChildren}
    />
  );
  const commonProps = getNativePropsForTNode(props);
  if (typeof onPress === 'function') {
    return React.createElement(
      GenericPressable,
      { onPress, ...commonProps },
      children
    );
  }
  return React.createElement(View, commonProps, children);
};

const TBlockRenderer = (props: TNodeSubRendererProps<TBlock>) => {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultBlockRenderer
  );
  return React.createElement(Renderer, assembledProps);
};

export default TBlockRenderer;
