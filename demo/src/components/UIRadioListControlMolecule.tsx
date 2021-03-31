import React, { useCallback, useMemo } from 'react';
import {
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import useSelectorItemsNucleon from './nucleons/useSelectorPropsNucleon';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import UIRadioItemAtom, { RADIO_ITEM_HEIGHT } from './UIRadioItemAtom';
import selectedRadioItemContextAtom from './selectedRadioItemContextAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import { useSpacing } from '@mobily/stacks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SelectorItem, SelectorListProps } from './nucleons/types';

export interface RadioListControlProps<V extends string>
  extends SelectorListProps<V> {
  style?: StyleProp<ViewStyle>;
  labelStyle?:
    | StyleProp<TextStyle>
    | ((item: SelectorItem<V>, index: number) => StyleProp<TextStyle>);
}

function extractKey(item: Required<SelectorItem<any>>, index: number) {
  return `${item.value}-${index}`;
}

const getItemLayout: FlatListProps<
  Required<SelectorItem<any>>
>['getItemLayout'] = function getItemLayout(data, index) {
  return {
    index,
    length: RADIO_ITEM_HEIGHT,
    offset: RADIO_ITEM_HEIGHT * index
  };
};

export default function UIRadioListControlMolecule<V extends string>({
  items,
  selectedValue,
  onSelectedValueChange,
  style,
  labelStyle
}: RadioListControlProps<V>) {
  const normalizedItems = useSelectorItemsNucleon(items);
  const spacing = useSpacing(2);
  const itemStyle = useMemo(() => ({ paddingHorizontal: spacing }), [spacing]);
  const { bottom: safeBottom } = useSafeAreaInsets();
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: spacing,
      paddingBottom: spacing + safeBottom
    }),
    [safeBottom, spacing]
  );
  const listRenderItem: ListRenderItem<Required<SelectorItem<V>>> = useCallback(
    ({ item, index }) => {
      const syntheticLabelStyle =
        typeof labelStyle === 'function' ? labelStyle(item, index) : labelStyle;
      const { label, value } = item;
      return (
        <UIRadioItemAtom
          labelStyle={syntheticLabelStyle}
          value={value}
          label={label}
          onSelectedValueChange={onSelectedValueChange}
          style={itemStyle}
        />
      );
    },
    [labelStyle, onSelectedValueChange, itemStyle]
  );
  return (
    <selectedRadioItemContextAtom.Provider value={selectedValue}>
      <BoxNucleon grow style={style}>
        <BottomSheetFlatList
          keyExtractor={extractKey}
          data={normalizedItems}
          renderItem={listRenderItem}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          contentContainerStyle={contentContainerStyle}
        />
      </BoxNucleon>
    </selectedRadioItemContextAtom.Provider>
  );
}
