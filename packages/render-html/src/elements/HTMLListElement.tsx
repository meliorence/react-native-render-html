import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import { DefaultTagRendererProps } from '../shared-types';
import type { TChildProps } from '../TChildrenRenderer';
import { useTChildrenRenderer } from '../context/TChildrenRendererContext';
import usePrefixRenderer, { SupportedListStyleType } from './usePrefixRenderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start'
  }
});

export interface HTMLListElementProps extends DefaultTagRendererProps<TBlock> {
  defaultListType: SupportedListStyleType;
}

export default function HTMLListElement({
  tnode,
  TDefaultRenderer,
  hasAnchorAncestor,
  defaultListType,
  style,
  ...props
}: HTMLListElementProps) {
  // Map children to horizontal rows with prefixes
  const TChildrenRenderer = useTChildrenRenderer();
  const prefixRenderer = usePrefixRenderer({
    listStyleType: tnode.styles.webTextFlow.listStyleType,
    defaultListType
  });
  const fontSize = tnode.styles.nativeTextFlow.fontSize || 14;
  const color = tnode.styles.nativeTextFlow.color as string;
  const lineHeight = tnode.styles.nativeTextFlow.lineHeight || 16.8;
  const prefixMarginRight = fontSize / 2;
  const prefixLength = prefixRenderer.computeStrSize(tnode.children.length);
  const bulletWidth = (fontSize || 12) * prefixLength;
  const paddingLeft =
    typeof tnode.styles.nativeBlockRet.paddingLeft === 'number'
      ? Math.max(
          tnode.styles.nativeBlockRet.paddingLeft,
          bulletWidth + prefixMarginRight
        )
      : bulletWidth + prefixMarginRight;
  const PrefixRenderer = prefixRenderer.Component;
  const prefixContainerStyle: ViewStyle = {
    width: bulletWidth,
    marginLeft: -(bulletWidth + prefixMarginRight),
    marginRight: prefixMarginRight,
    height: lineHeight,
    alignItems: 'flex-end'
  };
  const renderChild = ({ childElement, key, index }: TChildProps) => (
    <View key={key} style={styles.row}>
      <View style={prefixContainerStyle}>
        <PrefixRenderer
          index={index}
          nestLevel={0}
          color={color}
          fontSize={fontSize}
          lineHeight={lineHeight}
        />
      </View>
      {childElement}
    </View>
  );
  return (
    <TDefaultRenderer
      hasAnchorAncestor={hasAnchorAncestor}
      tnode={tnode}
      style={[style, { paddingLeft }]}
      {...props}>
      <TChildrenRenderer
        tchildren={tnode.children}
        hasAnchorAncestor={hasAnchorAncestor}
        renderChild={renderChild}
      />
    </TDefaultRenderer>
  );
}
