import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AtomicBox from '../components/AtomicBox';
import useAtomicTextStyle, {
  AtomicTextStyle
} from '../hooks/useAtomicTextStyle';

export interface AtomicRadioControlProps<V extends string>
  extends AtomicTextStyle {
  values: V[];
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  radioButton: {
    height: 35
  }
});

export default function AtomicRadioControl<V extends string>({
  values,
  selectedValue,
  onSelectedValueChange,
  style,
  ...atomicTextStyle
}: AtomicRadioControlProps<V>) {
  const labelStyle = useAtomicTextStyle(atomicTextStyle);
  return (
    <AtomicBox style={style}>
      <RadioButton.Group
        value={selectedValue}
        onValueChange={onSelectedValueChange as any}>
        {values.map((v, i) => (
          <RadioButton.Item
            style={styles.radioButton}
            key={i}
            label={v}
            value={v}
            labelStyle={labelStyle}
          />
        ))}
      </RadioButton.Group>
    </AtomicBox>
  );
}
