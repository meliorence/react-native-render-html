import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import UITideAtom, { TideAtomProps } from './UITideAtom';
import UISwitchControlAtom, {
  UISwitchControlAtomProps
} from './UISwitchControlAtom';

export type UISwitchTideMoleculeProps = Omit<
  UISwitchControlAtomProps,
  'style'
> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: TideAtomProps['leftIconName'];
  label: string;
};

export default function UISwitchTideMolecule({
  style,
  label,
  leftIconName,
  ...switchProps
}: UISwitchTideMoleculeProps) {
  const right = () => <UISwitchControlAtom {...switchProps} />;
  return (
    <UITideAtom
      onPress={() => switchProps.onValueChange?.(!switchProps.value)}
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
    />
  );
}
