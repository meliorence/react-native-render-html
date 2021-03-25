import React, { PropsWithChildren } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AtomicBox from './AtomicBox';
import useAtomicTextStyle, {
  AtomicTextStyle
} from '../hooks/useAtomicTextStyle';
import { useAtomicBottomSheet } from './AtomicBottomSheet';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

export interface AtomicRadioControlProps<V extends string>
  extends AtomicTextStyle {
  values: readonly V[];
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  radioButton: {
    height: 30,
    marginRight: -23
  },
  fixLabelOffset: {
    marginLeft: -15
  }
});

const Passthrough = ({ children }: PropsWithChildren<any>) => <>{children}</>;

export default function AtomicRadioControl<V extends string>({
  values,
  selectedValue,
  onSelectedValueChange,
  style,
  ...atomicTextStyle
}: AtomicRadioControlProps<V>) {
  const labelStyle = useAtomicTextStyle(atomicTextStyle);
  const isInBottomSheet = useAtomicBottomSheet();
  const WrapperTouchComponent =
    isInBottomSheet && Platform.OS === 'android'
      ? (TouchableWithoutFeedback as any)
      : Passthrough;
  return (
    <AtomicBox style={style}>
      <RadioButton.Group
        value={selectedValue}
        onValueChange={onSelectedValueChange as any}>
        {values.map((v, i) => (
          <WrapperTouchComponent
            key={i}
            onPress={() => onSelectedValueChange(v)}>
            <RadioButton.Item
              style={styles.radioButton}
              label={v}
              value={v}
              labelStyle={[labelStyle, styles.fixLabelOffset]}
            />
          </WrapperTouchComponent>
        ))}
      </RadioButton.Group>
    </AtomicBox>
  );
}
