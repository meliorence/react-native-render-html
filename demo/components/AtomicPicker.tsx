import React, { ComponentProps } from 'react';
import { Picker } from '@react-native-community/picker';
import useAtomicTextStyle from '../hooks/useAtomicTextStyle';
import { StyleSheet, View } from 'react-native';

type PickerProps = ComponentProps<typeof Picker>;

export interface AtomicPickerProps<V extends string | number>
  extends Pick<PickerProps, 'style'> {
  items: Array<{ value: string | number; label?: string }>;
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
}

const styles = StyleSheet.create({
  fixStyles: {
    marginLeft: -9,
    marginRight: -13,
    height: 30
  }
});

export default function AtomicPicker<V extends string | number>({
  items,
  onSelectedValueChange,
  style,
  ...pickerProps
}: AtomicPickerProps<V>) {
  return (
    <View style={style}>
      <Picker
        {...pickerProps}
        style={[useAtomicTextStyle(), styles.fixStyles]}
        onValueChange={onSelectedValueChange as any}>
        {items?.map((item, index) => (
          <Picker.Item
            key={`${item.value}-${index}`}
            value={item.value}
            label={item.label ?? (item.value as string)}
          />
        ))}
      </Picker>
    </View>
  );
}
