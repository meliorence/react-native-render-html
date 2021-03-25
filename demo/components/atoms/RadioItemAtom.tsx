import React, { memo, useCallback, useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { NuclearTextStyle } from '../nucleons/useNuclearTextStyle';
import GestureHandlerAdapterNucleon from '../nucleons/GestureHandlerAdapterNucleon';
import TextNucleon from '../nucleons/TextNucleon';
import selectedRadioItemContextAtom from './selectedRadioItemContextAtom';

export const RADIO_ITEM_HEIGHT = 40;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: { textAlignVertical: 'center' },
  item: { height: RADIO_ITEM_HEIGHT }
});

const RadioItemAtom = memo(function RadioItem<V extends string>({
  value,
  label,
  onSelectedValueChange,
  labelStyle,
  style
}: {
  value: V;
  label: string;
  onSelectedValueChange: (v: any) => void;
  labelStyle?: NuclearTextStyle;
  style?: StyleProp<ViewStyle>;
}) {
  const onPress = useCallback(() => onSelectedValueChange(value), [
    value,
    onSelectedValueChange
  ]);
  const selected = useContext(selectedRadioItemContextAtom) === value;
  return (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple style={[styles.item, style]} onPress={onPress}>
        <View style={styles.row}>
          <TextNucleon {...labelStyle} style={styles.label}>
            {label}
          </TextNucleon>
          <RadioButton
            status={selected ? 'checked' : 'unchecked'}
            value={value}
          />
        </View>
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  );
});

type RadioItemAtom = typeof RadioItemAtom;

export default RadioItemAtom;
