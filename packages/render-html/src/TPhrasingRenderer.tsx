import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { useTChildrenRenderer } from './context/TChildrenRendererContext';
import {
  TDefaultRenderer,
  TNodeGenericRendererProps,
  TRendererBaseProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import { useRegisteredRenderer } from './context/RenderRegistryProvider';
import isLiteRendererDeclaration from './render/isLiteRendererDeclaration';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  tnode,
  key,
  style,
  children: overridingChildren,
  hasAnchorAncestor,
  textProps
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const resolvedStyles = textProps?.style ? [textProps.style, style] : style;
  const children = overridingChildren ?? (
    <TChildrenRenderer tnode={tnode} hasAnchorAncestor={hasAnchorAncestor} />
  );
  return React.createElement(
    Text,
    { key, ...textProps, style: resolvedStyles },
    children
  );
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
  const commonProps: TRendererBaseProps<TPhrasing> = {
    key,
    tnode,
    style,
    textProps: {
      allowFontScaling,
      selectable: textSelectable
    },
    viewProps: {},
    type: 'text',
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
