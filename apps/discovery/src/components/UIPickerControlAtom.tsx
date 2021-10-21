import React, { ComponentProps } from 'react';
import { Picker } from '@react-native-picker/picker';
import useTextRoleNucleon from './nucleons/useTextRoleNucleon';
import { StyleSheet, View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import useSelectorItemsNucleon from './nucleons/useSelectorPropsNucleon';
import { SelectorListProps } from './nucleons/types';
import { useColorRoles } from '../theme/colorSystem';

type PickerProps = ComponentProps<typeof Picker>;

export interface UIPickerControlAtomProps<V extends string | number>
  extends Pick<PickerProps, 'style'>,
    SelectorListProps<V> {}

const styles = StyleSheet.create({
  fixContainer: {
    height: 30
  },
  fixStyles: {
    marginLeft: -9,
    marginRight: -13,
    marginTop: -10
  }
});

export default function UIPickerControlAtom<V extends string | number>({
  items,
  onSelectedValueChange,
  style,
  ...pickerProps
}: UIPickerControlAtomProps<V>) {
  const { pressable } = useColorRoles();
  const normalizedItems = useSelectorItemsNucleon(items);
  const labelStyle = useTextRoleNucleon({ role: 'uiLabel' });
  return (
    <View style={[styles.fixContainer, style]}>
      <NativeViewGestureHandler disallowInterruption={true}>
        <Picker
          {...pickerProps}
          style={[labelStyle, styles.fixStyles]}
          dropdownIconColor={pressable.tint}
          onValueChange={onSelectedValueChange as any}>
          {normalizedItems.map((item, index) => (
            <Picker.Item
              key={`${item.value}-${index}`}
              value={item.value}
              label={item.label ?? (item.value as string)}
            />
          ))}
        </Picker>
      </NativeViewGestureHandler>
    </View>
  );
}
