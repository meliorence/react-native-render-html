import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { TBlock } from '@native-html/transient-render-tree';
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

const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  key,
  children: overridingChildren,
  nativeStyle,
  syntheticAnchorOnLinkPress,
  collapsedMarginTop
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer
      tnode={tnode}
      syntheticAnchorOnLinkPress={syntheticAnchorOnLinkPress}
    />
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
  syntheticAnchorOnLinkPress,
  collapsedMarginTop
}: TNodeGenericRendererProps<TBlock>) => {
  const rendererProps: RendererProps<TBlock> = {
    key,
    tnode,
    nativeStyle: {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    },
    syntheticAnchorOnLinkPress,
    TDefaultRenderer: TDefaultBlockRenderer,
    untranslatedStyle: tnode.styles.webTextFlow,
    collapsedMarginTop
  };
  const defaultRenderer = defaultRenderers.block[tnode.tagName as any];
  if (defaultRenderer) {
    return defaultRenderer(rendererProps);
  }
  return React.createElement(TDefaultBlockRenderer, rendererProps);
};

export default TBlockRenderer;
