import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  DefaultTagRenderer,
  TDefaultRenderer,
  TNodeRendererProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import GenericPressable from './GenericPressable';
import { useRendererConfig } from './context/RenderRegistryProvider';
import { useDefaultViewProps } from './context/SharedPropsContext';

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  children: overridingChildren,
  propsFromParent,
  style,
  onPress,
  viewProps,
  key
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const children = overridingChildren ?? (
    <TNodeChildrenRenderer tnode={tnode} propsFromParent={propsFromParent} />
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

const TBlockRenderer = ({
  tnode,
  key,
  propsFromParent
}: TNodeRendererProps<TBlock>) => {
  const { Default, Custom } = useRendererConfig(tnode);
  const viewProps = useDefaultViewProps();
  const commonProps: CustomTagRendererProps<TBlock> = {
    key,
    tnode,
    style: mergeCollapsedMargins(propsFromParent.collapsedMarginTop, {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    }),
    viewProps,
    textProps: {},
    type: 'text',
    TDefaultRenderer: TDefaultBlockRenderer,
    propsFromParent,
    DefaultTagRenderer:
      Default || (TDefaultBlockRenderer as DefaultTagRenderer<TBlock>)
  };
  const Root = (Custom ??
    Default ??
    TDefaultBlockRenderer) as CustomTagRenderer<TBlock>;
  return React.createElement(Root, commonProps);
};

export default TBlockRenderer;
