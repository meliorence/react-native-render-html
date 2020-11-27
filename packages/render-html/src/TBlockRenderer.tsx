import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { useTChildrenRenderer } from './context/TChildrenRendererContext';
import {
  TDefaultRenderer,
  TNodeGenericRendererProps,
  TRendererBaseProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import GenericPressable from './GenericPressable';
import { useRegisteredRenderer } from './context/RenderRegistryProvider';
import isLiteRendererDeclaration from './render/isLiteRendererDeclaration';

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
    key
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
  const RegisteredRenderer = useRegisteredRenderer(tnode);
  const commonProps: TRendererBaseProps<TBlock> = {
    key,
    tnode,
    style: mergeCollapsedMargins(collapsedMarginTop, {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    }),
    textProps: {},
    viewProps: {},
    type: 'text',
    hasAnchorAncestor
  };
  if (isLiteRendererDeclaration(RegisteredRenderer)) {
    return React.createElement(
      TDefaultBlockRenderer,
      RegisteredRenderer.deriveTDefaultPropsForTNode(commonProps)
    );
  }
  if (typeof RegisteredRenderer === 'function') {
    return React.createElement(RegisteredRenderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultBlockRenderer
    });
  }
  return React.createElement(TDefaultBlockRenderer, commonProps);
};

export default TBlockRenderer;
