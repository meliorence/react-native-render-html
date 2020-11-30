import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { useTChildrenRenderer } from './context/TChildrenRendererContext';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  DefaultTagRenderer,
  TDefaultRenderer,
  TNodeGenericRendererProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import GenericPressable from './GenericPressable';
import { useRendererConfig } from './context/RenderRegistryProvider';

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  children: overridingChildren,
  hasAnchorAncestor,
  style,
  onPress,
  viewProps,
  key
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer tnode={tnode} hasAnchorAncestor={hasAnchorAncestor} />
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
  hasAnchorAncestor,
  collapsedMarginTop
}: TNodeGenericRendererProps<TBlock>) => {
  const { Default, Custom } = useRendererConfig(tnode);
  const commonProps: CustomTagRendererProps<TBlock> = {
    key,
    tnode,
    style: mergeCollapsedMargins(collapsedMarginTop, {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    }),
    textProps: {},
    viewProps: {},
    type: 'text',
    hasAnchorAncestor,
    TDefaultRenderer: TDefaultBlockRenderer,
    DefaultTagRenderer:
      Default || (TDefaultBlockRenderer as DefaultTagRenderer<TBlock>)
  };
  const Root = (Custom ??
    Default ??
    TDefaultBlockRenderer) as CustomTagRenderer<TBlock>;
  return React.createElement(Root, commonProps);
};

export default TBlockRenderer;
