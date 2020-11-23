import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { useTChildrenRenderer } from './context/TChildrenRendererContext';
import {
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeGenericRendererProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import { useRegisteredRenderer } from './context/RenderRegistryProvider';
import isLiteRendererDeclaration from './render/isLiteRendererDeclaration';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  tnode,
  key,
  children: overridingChildren,
  hasAnchorAncestor,
  ...passedProps
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer tnode={tnode} hasAnchorAncestor={hasAnchorAncestor} />
  );
  return React.createElement(Text, passedProps, children);
};

const TPhrasingRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  collapsedMarginTop
}: TNodeGenericRendererProps<TPhrasing>) => {
  const { allowFontScaling, textSelectable } = useSharedProps();
  const RegisteredRenderer = useRegisteredRenderer(tnode);
  const style = mergeCollapsedMargins(collapsedMarginTop, {
    ...tnode.styles.nativeBlockFlow,
    ...tnode.styles.nativeBlockRet,
    ...tnode.styles.nativeTextFlow,
    ...tnode.styles.nativeTextRet
  });
  const commonProps: TDefaultRendererProps<TPhrasing> = {
    key,
    tnode,
    style,
    allowFontScaling,
    selectable: textSelectable,
    hasAnchorAncestor
  };
  if (isLiteRendererDeclaration(RegisteredRenderer)) {
    return React.createElement(
      TDefaultPhrasingRenderer,
      RegisteredRenderer.deriveTDefaultPropsForTNode(commonProps)
    );
  }
  if (typeof RegisteredRenderer === 'function') {
    return React.createElement(RegisteredRenderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultPhrasingRenderer
    });
  }
  return React.createElement(TDefaultPhrasingRenderer, commonProps);
};

export default TPhrasingRenderer;
