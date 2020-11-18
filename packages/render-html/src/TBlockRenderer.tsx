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
  syntheticAnchorOnLinkPress
}: RendererProps<TBlock>) => {
  const children = overridingChildren ?? renderTChildren(tnode, passedProps, syntheticAnchorOnLinkPress);
  if (typeof syntheticAnchorOnLinkPress === 'function') {
    return (
      <GenericPressable
        key={key}
        style={nativeStyle}
        onPress={syntheticAnchorOnLinkPress}>
        {children}
      </GenericPressable>
    );
  }
  return (
    <View key={key} style={nativeStyle}>
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
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TBlock>) => {
  const rendererProps: RendererProps<TBlock> = {
    key,
    tnode,
    nativeStyle: [tnode.styles.nativeBlockFlow, tnode.styles.nativeBlockRet],
    passedProps,
    renderTChildren,
    renderTNode,
    syntheticAnchorOnLinkPress,
    Default: DefaultBlockRenderer,
    untranslatedStyle: tnode.styles.webTextFlow
  };
  const defaultRenderer = defaultRenderers.block[tnode.tagName as any];
  if (defaultRenderer) {
    return defaultRenderer(rendererProps);
  }
  return React.createElement(DefaultBlockRenderer, rendererProps);
};

export default TBlockRenderer;
