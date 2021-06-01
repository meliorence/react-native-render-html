import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import UITideAtom, { UITideAtomProps } from './UITideAtom';
import UISwitchControlAtom, {
  UISwitchControlAtomProps
} from './UISwitchControlAtom';

export type UISwitchTideMoleculeProps = Omit<
  UISwitchControlAtomProps,
  'style'
> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: UITideAtomProps['leftIconName'];
  label: string;
};

export default function UISwitchTideMolecule({
  style,
  label,
  leftIconName,
  ...switchProps
}: UISwitchTideMoleculeProps) {
  const right = () => <UISwitchControlAtom {...switchProps} />;
  const onPress = () => {
    switchProps.onValueChange?.(!switchProps.value);
  };
  return (
    <UITideAtom
      onPress={onPress}
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
    />
  );
}
