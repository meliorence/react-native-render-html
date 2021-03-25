import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ListItemNucleonProps } from '../nucleons/ListItemNucleon';
import TideAtom from './TideAtom';

export type ControlItemAtomProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  right?: ListItemNucleonProps['right'];
  label: string;
  leftIconName: ListItemNucleonProps['leftIconName'];
}>;

export default function ControlItemAtom({
  style,
  label,
  right,
  leftIconName,
  children
}: ControlItemAtomProps) {
  return (
    <TideAtom
      style={style}
      right={right}
      leftIconName={leftIconName}
      title={label}
      bottom={children}
    />
  );
}
