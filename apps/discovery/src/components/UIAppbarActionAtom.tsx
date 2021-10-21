import React from 'react';
import { Appbar } from 'react-native-paper';
import { useColorRoles } from '../theme/colorSystem';

export type UIAppbarActionAtomProps = React.ComponentProps<
  typeof Appbar.Action
>;

export default function UIAppbarActionAtom({
  color,
  rippleColor,
  ...props
}: UIAppbarActionAtomProps) {
  const { pressable } = useColorRoles();
  return (
    <Appbar.Action
      rippleColor={rippleColor || pressable.ripple}
      color={color || pressable.tint}
      {...props}
    />
  );
}
