import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-tree';
import { TNodeGenericRendererProps } from './TNodeRenderer';
import { RendererProps } from './defaultRenderers';
import GenericPressable from './GenericPressable';

const DefaultBlockRenderer = ({
  tnode,
  key,
  renderTChildren,
  children: overridingChildren,
  passedProps,
  nativeStyle,
  syntheticAnchorOnLinkPress,
  marginCollapsingEnabled,
  collapsedMarginTop
}: RendererProps<TBlock>) => {
  const children =
    overridingChildren ??
    renderTChildren(tnode, {
      passedProps,
      syntheticAnchorOnLinkPress,
      marginCollapsingEnabled
    });
  const additionalStyles: any = {};
  if (typeof collapsedMarginTop === 'number') {
    additionalStyles.marginTop = collapsedMarginTop;
  }
  const finalStyles =
    collapsedMarginTop !== null ? [nativeStyle, additionalStyles] : nativeStyle;
  if (typeof syntheticAnchorOnLinkPress === 'function') {
    return (
      <GenericPressable
        key={key}
        style={finalStyles}
        onPress={syntheticAnchorOnLinkPress}>
        {children}
      </GenericPressable>
    );
  }
  return (
    <View key={key} style={finalStyles}>
      {children}
    </View>
  );
};

const TBlockRenderer = ({
  tnode,
  key,
  renderTChildren,
  renderTNode,
  defaultRenderers,
  passedProps,
  syntheticAnchorOnLinkPress,
  marginCollapsingEnabled,
  collapsedMarginTop: collapsedMargins
}: TNodeGenericRendererProps<TBlock>) => {
  const rendererProps: RendererProps<TBlock> = {
    key,
    tnode,
    nativeStyle: {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    },
    passedProps,
    renderTChildren,
    renderTNode,
    syntheticAnchorOnLinkPress,
    Default: DefaultBlockRenderer,
    untranslatedStyle: tnode.styles.webTextFlow,
    marginCollapsingEnabled,
    collapsedMarginTop: collapsedMargins
  };
  const defaultRenderer = defaultRenderers.block[tnode.tagName as any];
  if (defaultRenderer) {
    return defaultRenderer(rendererProps);
  }
  return React.createElement(DefaultBlockRenderer, rendererProps);
};

export default TBlockRenderer;
