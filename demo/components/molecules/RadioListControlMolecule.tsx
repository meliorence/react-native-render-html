import React, { useCallback, useMemo } from 'react';
import {
  FlatListProps,
  ListRenderItem,
  StyleProp,
  ViewStyle
} from 'react-native';
import { NuclearTextStyle } from '../nucleons/useNuclearTextStyle';
import useSelectorItemsNucleon, {
  SelectorItem,
  SelectorProps
} from '../nucleons/useSelectorPropsNucleon';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RadioItemAtom, { RADIO_ITEM_HEIGHT } from '../atoms/RadioItemAtom';
import selectedRadioItemContextAtom from '../atoms/selectedRadioItemContextAtom';
import BoxNucleon from '../nucleons/BoxNucleon';
import { useSpacing } from '@mobily/stacks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface RadioListControlProps<V extends string>
  extends SelectorProps<V> {
  style?: StyleProp<ViewStyle>;
  labelStyle?: NuclearTextStyle;
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

export default function RadioListControlMolecule<V extends string>({
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
  const listRenderItem: ListRenderItem<
    Required<SelectorItem<V>>
  > = useCallback(
    ({ item: { label, value } }) => (
      <RadioItemAtom
        labelStyle={labelStyle}
        value={value}
        label={label}
        onSelectedValueChange={onSelectedValueChange}
        style={itemStyle}
      />
    ),
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
