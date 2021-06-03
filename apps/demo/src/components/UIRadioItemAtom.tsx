import React, { memo, useCallback, useContext } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import GestureHandlerAdapterNucleon from './nucleons/GestureHandlerAdapterNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import selectedRadioItemContextAtom from './selectedRadioItemContextAtom';
import { useColorRoles } from '../theme/colorSystem';

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

const UIRadioItemAtom = memo(function RadioItem<V extends string>({
  value,
  label,
  onSelectedValueChange,
  labelStyle,
  style
}: {
  value: V;
  label: string;
  onSelectedValueChange: (v: any) => void;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}) {
  const onPress = useCallback(() => onSelectedValueChange(value), [
    value,
    onSelectedValueChange
  ]);
  const selected = useContext(selectedRadioItemContextAtom) === value;
  const { pressable, selectable, surface } = useColorRoles();
  const color = selected
    ? selectable.activeBackground
    : selectable.inactiveBackground;
  return (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple
        rippleColor={pressable.ripple}
        style={[styles.item, style]}
        onPress={onPress}>
        <View style={styles.row}>
          <TextRoleNucleon role="uiLabel" style={(styles.label, labelStyle)}>
            {label}
          </TextRoleNucleon>
          <RadioButton
            status={selected ? 'checked' : 'unchecked'}
            value={value}
            color={color}
            theme={{
              colors: {
                text: surface.content
              }
            }}
          />
        </View>
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  );
});

type UIRadioItemAtom = typeof UIRadioItemAtom;

export default UIRadioItemAtom;
