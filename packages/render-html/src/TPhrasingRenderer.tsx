import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useDefaultTextProps } from './context/SharedPropsContext';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  DefaultTagRenderer,
  TDefaultRenderer,
  TNodeRendererProps
} from './shared-types';
import mergeCollapsedMargins from './helpers/mergeCollapsedMargins';
import { useRendererConfig } from './context/RenderRegistryProvider';

export const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  tnode,
  key,
  style,
  children: overridingChildren,
  hasAnchorAncestor,
  textProps,
  onPress
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const resolvedStyles = textProps?.style ? [textProps.style, style] : style;
  const children = overridingChildren ?? (
    <TNodeChildrenRenderer
      tnode={tnode}
      hasAnchorAncestor={hasAnchorAncestor}
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
    children
  );
};

const TPhrasingRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  collapsedMarginTop
}: TNodeRendererProps<TPhrasing>) => {
  const textProps = useDefaultTextProps();
  const { Default, Custom } = useRendererConfig(tnode);
  const style = mergeCollapsedMargins(collapsedMarginTop, {
    ...tnode.styles.nativeBlockFlow,
    ...tnode.styles.nativeBlockRet,
    ...tnode.styles.nativeTextFlow,
    ...tnode.styles.nativeTextRet
  });
  const commonProps: CustomTagRendererProps<TPhrasing> = {
    key,
    tnode,
    style,
    hasAnchorAncestor,
    textProps,
    viewProps: {},
    type: 'text',
    TDefaultRenderer: TDefaultPhrasingRenderer,
    DefaultTagRenderer:
      Default || (TDefaultPhrasingRenderer as DefaultTagRenderer<TPhrasing>)
  };
  const Root = (Custom ??
    Default ??
    TDefaultPhrasingRenderer) as CustomTagRenderer<TPhrasing>;
  return React.createElement(Root, commonProps);
};

export default TPhrasingRenderer;
