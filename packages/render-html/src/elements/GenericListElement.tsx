import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import { DefaultTagRendererProps } from '../shared-types';
import type { TChildProps } from '../TChildrenRenderer';
import { useTChildrenRenderer } from '../context/TChildrenRendererContext';
import usePrefixRenderer, { SupportedListStyleType } from './usePrefixRenderer';
import NestLevelProvider, {
  useListNestLevel
} from '../context/NestLevelProvider';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start'
  }
});

export interface GenericListElementProps<T extends 'ol' | 'ul'>
  extends DefaultTagRendererProps<TBlock> {
  listType: T;
  getListStyleTypeFromNestLevel: (nestLevel: number) => SupportedListStyleType;
  getStyleFromNestLevel?: (nestLevel: number) => ViewStyle | null;
}

export default function GenericListElement({
  tnode,
  TDefaultRenderer,
  listType,
  style,
  getListStyleTypeFromNestLevel,
  getStyleFromNestLevel,
  ...props
}: GenericListElementProps<any>) {
  const nestLevel = useListNestLevel(listType);
  const nestLevelStyle = getStyleFromNestLevel?.call(null, nestLevel);
  // Map children to horizontal rows with prefixes
  const TChildrenRenderer = useTChildrenRenderer();
  const prefixRenderer = usePrefixRenderer({
    nestLevel,
    getListStyleTypeFromNestLevel,
    listStyleType: tnode.styles.webTextFlow.listStyleType
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
          color={color}
          fontSize={fontSize}
          lineHeight={lineHeight}
        />
      </View>
      {childElement}
    </View>
  );
  return (
    <NestLevelProvider listType={listType} level={nestLevel + 1}>
      <TDefaultRenderer
        tnode={tnode}
        style={[style, { paddingLeft }, nestLevelStyle]}
        {...props}>
        <TChildrenRenderer
          tchildren={tnode.children}
          renderChild={renderChild}
        />
      </TDefaultRenderer>
    </NestLevelProvider>
  );
}
