/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TBlock, TNode } from '@native-html/transient-render-engine';
import {
  MarkedListItem,
  useMarkedList,
  MarkerBoxProps
} from '@jsamr/react-native-li';
import type {
  DefaultSupportedListStyleType,
  InternalRendererProps,
  ListElementConfig,
  ListStyleSpec,
  TChildProps,
  UnitaryListStyleSpec
} from '../shared-types';
import { useTChildrenRenderer } from '../context/TChildrenRendererContext';
import { DEFAULT_TEXT_COLOR } from '../constants';
import pick from 'ramda/src/pick';

export interface ListElementProps<T extends 'ol' | 'ul'>
  extends InternalRendererProps<TBlock>,
    ListElementConfig {
  listType: T;
  listStyleSpecs: Record<string, ListStyleSpec>;
}

function getStartIndex(tnode: TNode) {
  const parsedIndex = tnode.attributes.start
    ? Number(tnode.attributes.start)
    : Number.NaN;
  return Number.isNaN(parsedIndex) ? 1 : parsedIndex;
}

function createSymbolicMarkerRenderer(
  component: UnitaryListStyleSpec['Component']
) {
  return ({
    style,
    markerTextStyle,
    counterRenderer,
    rtlMarkerReversed = false
  }: MarkerBoxProps) => {
    const prefix = counterRenderer.renderPrefix();
    const suffix = counterRenderer.renderSuffix();
    return (
      <View
        style={[
          style,
          {
            flexDirection: rtlMarkerReversed ? 'row-reverse' : 'row',
            justifyContent: 'flex-end'
          }
        ]}>
        {prefix !== '' && <Text style={markerTextStyle}>{prefix}</Text>}
        {React.createElement(component, markerTextStyle as any)}
        {suffix !== '' && <Text style={markerTextStyle}>{suffix}</Text>}
      </View>
    );
  };
}

function extractMarkerTextStyle(tnode: TNode) {
  return Object.assign(
    {},
    {
      lineHeight: 14 * 1.3,
      fontSize: 14,
      color: DEFAULT_TEXT_COLOR
    },
    pick(
      [
        'fontStyle',
        'fontSize',
        'fontWeight',
        'fontFamily',
        'fontVariant',
        'color',
        'lineHeight'
      ],
      tnode.styles.nativeTextFlow
    )
  );
}

function getMarkerBoxStyle(
  markerWidth: number | false,
  paddingValue: string | number | undefined
) {
  const markerBoxWidth =
    typeof markerWidth === 'number'
      ? typeof paddingValue === 'number'
        ? Math.max(paddingValue, markerWidth)
        : markerWidth
      : paddingValue;
  return { width: markerBoxWidth };
}

export default function ListElement({
  tnode,
  TDefaultRenderer,
  listType,
  style,
  getFallbackListStyleTypeFromNestLevel: getListStyleTypeFromNestLevel,
  enableExperimentalRtl = false,
  enableRemoveTopMarginIfNested = true,
  enableRemoveBottomMarginIfNested = true,
  enableDynamicMarkerBoxWidth = false,
  listStyleSpecs,
  ...props
}: ListElementProps<any>) {
  const markers = tnode.markers;
  const nestLevel =
    listType === 'ol' ? markers.olNestLevel : markers.ulNestLevel;
  const TChildrenRenderer = useTChildrenRenderer();
  const rtl =
    enableExperimentalRtl &&
    (style.direction === 'rtl' || markers.direction === 'rtl');
  const removeTopMarginStyle =
    enableRemoveTopMarginIfNested &&
    tnode.parent?.tagName === 'li' &&
    tnode.nodeIndex === 0
      ? styles.zeroMarginTop
      : null;
  const removeBottomMarginStyle =
    enableRemoveBottomMarginIfNested &&
    tnode.parent?.tagName === 'li' &&
    tnode.nodeIndex === tnode.parent?.children.length - 1
      ? styles.zeroMarginBottom
      : null;
  const selectedListType = getListStyleTypeFromNestLevel!(nestLevel);
  const listStyleType =
    (tnode.styles.webTextFlow.listStyleType as DefaultSupportedListStyleType) ||
    selectedListType;
  if (__DEV__ && !(listStyleType in listStyleSpecs)) {
    if (listStyleType.match(/^("|')/)) {
      console.warn(
        "This library doesn't support strings for list-style-type CSS properties."
      );
    } else {
      console.warn(
        `list-style-type "${listStyleType}" is not handled by react-native-render-html. ` +
          'You can easily provide support for this style via "customListStyleSpecs" prop.'
      );
    }
  }
  const spec =
    listStyleType in listStyleSpecs
      ? listStyleSpecs[listStyleType]
      : listStyleSpecs[selectedListType];
  const counterRenderer = spec.counterStyleRenderer;
  const startIndex = getStartIndex(tnode);
  const markerTextStyle = extractMarkerTextStyle(tnode);
  const itemProps = useMarkedList({
    counterRenderer,
    startIndex,
    markerTextStyle,
    rtlLineReversed: rtl,
    rtlMarkerReversed: rtl,
    length: tnode.children.length,
    dynamicMarkerBoxWidth: enableDynamicMarkerBoxWidth,
    renderMarker:
      spec.type === 'unitary'
        ? createSymbolicMarkerRenderer(spec.Component)
        : undefined
  });
  const markerWidth = itemProps.markerTextWidth;
  const fixedPaddingRule = rtl
    ? ('paddingRight' as const)
    : ('paddingLeft' as const);
  // Fallback to padding-left value on RTL mode
  const paddingValue = style[fixedPaddingRule] ?? style['paddingLeft'];
  const markerBoxWidthStyle = getMarkerBoxStyle(markerWidth, paddingValue);
  const renderChild = ({ childElement, key, index }: TChildProps) => (
    <MarkedListItem
      key={key}
      index={index}
      {...itemProps}
      markerBoxStyle={[itemProps.markerBoxStyle, markerBoxWidthStyle]}
      markerTextStyle={itemProps.markerTextStyle}
      style={itemProps.style}>
      <View style={styles.shrink}>{childElement}</View>
    </MarkedListItem>
  );

  const dynamicPaddingStyle = {
    position: 'relative' as const,
    [fixedPaddingRule]: 0
  };
  return (
    <TDefaultRenderer
      tnode={tnode}
      style={[
        style,
        removeTopMarginStyle,
        removeBottomMarginStyle,
        dynamicPaddingStyle
      ]}
      {...props}>
      <TChildrenRenderer tchildren={tnode.children} renderChild={renderChild} />
    </TDefaultRenderer>
  );
}

const styles = StyleSheet.create({
  zeroMarginTop: { marginTop: 0 },
  zeroMarginBottom: { marginBottom: 0 },
  shrink: { flexShrink: 1 }
});
