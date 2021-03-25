import React, { ComponentProps } from 'react';
import { Picker } from '@react-native-picker/picker';
import useNuclearTextStyle from '../nucleons/useNuclearTextStyle';
import { StyleSheet, View } from 'react-native';
import { useThemeColors } from '../../state/ThemeProvider';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import useSelectorItemsNucleon, {
  SelectorProps
} from '../nucleons/useSelectorPropsNucleon';

type PickerProps = ComponentProps<typeof Picker>;

export interface PickerControlAtomProps<V extends string | number>
  extends Pick<PickerProps, 'style'>,
    SelectorProps<V> {}

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

export default function PickerControlAtom<V extends string | number>({
  items,
  onSelectedValueChange,
  style,
  ...pickerProps
}: PickerControlAtomProps<V>) {
  const theme = useThemeColors();
  const normalizedItems = useSelectorItemsNucleon(items);
  return (
    <View style={[styles.fixContainer, style]}>
      <NativeViewGestureHandler disallowInterruption={true}>
        <Picker
          {...pickerProps}
          style={[useNuclearTextStyle(), styles.fixStyles]}
          dropdownIconColor={theme.accent}
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
