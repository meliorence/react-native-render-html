import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import defaultRenderers from './defaultRenderers';
import GenericPressable from './GenericPressable';
import { useTChildrenRenderer } from './context/TNodeRenderersContext';
import {
  RendererProps,
  TDefaultRenderer,
  TNodeGenericRendererProps
} from './shared-types';

function mergeCollapsedMargins(
  collapsedMarginTop: RendererProps<any>['collapsedMarginTop'],
  nativeStyle: RendererProps<any>['nativeStyle']
) {
  if (collapsedMarginTop === null) {
    return nativeStyle;
  }
  const additionalStyles: any = {};
  if (typeof collapsedMarginTop === 'number') {
    additionalStyles.marginTop = collapsedMarginTop;
  }
  return [nativeStyle, additionalStyles];
}

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  key,
  children: overridingChildren,
  nativeStyle,
  hasAnchorAncestor: isAnchorChild,
  syntheticAnchorOnLinkPress,
  collapsedMarginTop
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer tnode={tnode} hasAnchorAncestor={isAnchorChild} />
  );
  const sharedProps: PropsWithChildren<
    ViewProps & { key?: string | number }
  > = {
    key,
    children,
    style: mergeCollapsedMargins(collapsedMarginTop, nativeStyle)
  };
  if (typeof syntheticAnchorOnLinkPress === 'function') {
    return (
      <GenericPressable {...sharedProps} onPress={syntheticAnchorOnLinkPress} />
    );
  }
  return React.createElement(View, sharedProps);
};

const TBlockRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  collapsedMarginTop,
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TBlock>) => {
  const rendererProps: RendererProps<TBlock> = {
    key,
    tnode,
    nativeStyle: {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    },
    hasAnchorAncestor,
    TDefaultRenderer: TDefaultBlockRenderer,
    untranslatedStyle: tnode.styles.webTextFlow,
    collapsedMarginTop,
    syntheticAnchorOnLinkPress
  };
  const defaultRenderer = defaultRenderers.block[tnode.tagName as any];
  if (defaultRenderer) {
    return defaultRenderer(rendererProps);
  }
  return React.createElement(TDefaultBlockRenderer, rendererProps);
};

export default TBlockRenderer;
