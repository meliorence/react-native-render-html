import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import TideAtom, { TideAtomProps } from '../atoms/TideAtom';
import SwitchControlAtom, {
  SwitchControlAtomProps
} from '../atoms/SwitchControlAtom';

export type SwitchTideMoleculeProps = Omit<SwitchControlAtomProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: TideAtomProps['leftIconName'];
  label: string;
};

export default function SwitchTideMolecule({
  style,
  label,
  leftIconName,
  ...switchProps
}: SwitchTideMoleculeProps) {
  const right = () => <SwitchControlAtom {...switchProps} />;
  return (
    <TideAtom
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
    />
  );
}
