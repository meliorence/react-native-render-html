/* eslint-disable react-native/no-inline-styles */
import { Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { TBlock, TNode } from '@native-html/transient-render-engine';
import {
  MarkedListItem,
  useMarkedList,
  MarkerBoxProps
} from '@jsamr/react-native-li';
import { DefaultTagRendererProps, TChildProps } from '../shared-types';
import { useTChildrenRenderer } from '../context/TChildrenRendererContext';
import { DEFAULT_TEXT_COLOR } from '../constants';
import pick from 'ramda/src/pick';
import defaultMarkers, { UnitaryListStyleSpec } from './defaultMarkers';
import { SupportedListStyleType } from './list-types';

export interface ListElementProps<T extends 'ol' | 'ul'>
  extends DefaultTagRendererProps<TBlock> {
  listType: T;
  getListStyleTypeFromNestLevel: (nestLevel: number) => SupportedListStyleType;
  getStyleFromNestLevel?: (nestLevel: number) => ViewStyle | null;
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
    markerTextWidth,
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
            justifyContent: 'flex-end',
            width: markerTextWidth
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

export default function ListElement({
  tnode,
  TDefaultRenderer,
  listType,
  style,
  getListStyleTypeFromNestLevel,
  getStyleFromNestLevel,
  markers,
  ...props
}: ListElementProps<any>) {
  const nestLevel =
    listType === 'ol' ? markers.olNestLevel : markers.ulNestLevel;
  const TChildrenRenderer = useTChildrenRenderer();
  const rtl =
    tnode.styles.nativeBlockFlow.direction === 'rtl' ||
    markers.direction === 'rtl';
  const nestLevelStyle = getStyleFromNestLevel?.call(null, nestLevel);
  const selectedListType = getListStyleTypeFromNestLevel(nestLevel);
  const listStyleType =
    (tnode.styles.webTextFlow.listStyleType as SupportedListStyleType) ||
    selectedListType;
  if (__DEV__ && !(listStyleType in defaultMarkers)) {
    console.warn(
      `list-style-type "${listStyleType}" is not handled by react-native-render-html.` +
        'You can register a custom list marker renderer with the appropriate prop.'
    );
  }
  const spec =
    listStyleType in defaultMarkers
      ? defaultMarkers[listStyleType]
      : defaultMarkers[selectedListType];
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
    renderMarker:
      spec.type === 'cyclic'
        ? createSymbolicMarkerRenderer(spec.Component)
        : undefined
  });
  const markerWidth = itemProps.markerTextWidth;
  const renderChild = ({ childElement, key, index }: TChildProps) => (
    <MarkedListItem
      key={key}
      index={index}
      {...itemProps}
      style={[itemProps.style, { [rtl ? 'right' : 'left']: -markerWidth }]}>
      <View style={{ flexShrink: 1 }}>{childElement}</View>
    </MarkedListItem>
  );
  const fixedPaddingRule = rtl
    ? ('paddingRight' as const)
    : ('paddingLeft' as const);
  const paddingValue = tnode.styles.nativeBlockRet[fixedPaddingRule];
  const dynamicStyle = {
    position: 'relative' as const,
    [fixedPaddingRule]:
      typeof paddingValue === 'number'
        ? Math.max(paddingValue, markerWidth)
        : markerWidth
  };
  return (
    <TDefaultRenderer
      tnode={tnode}
      markers={markers}
      style={[style, nestLevelStyle, dynamicStyle]}
      {...props}>
      <TChildrenRenderer
        tchildren={tnode.children}
        renderChild={renderChild}
        parentMarkers={markers}
      />
    </TDefaultRenderer>
  );
}
