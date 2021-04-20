import React from 'react';
import { SwitchProps, Switch, AccessibilityProps } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useColorRoles } from '../theme/colorSystem';

export type UISwitchControlAtomProps = Omit<
  SwitchProps,
  'tintColor' | 'trackColor' | 'thumbColor'
> &
  AccessibilityProps;

export default function UISwitchControlAtom({
  value,
  ...switchProps
}: UISwitchControlAtomProps) {
  const { switchColor, trackColor } = useColorRoles();
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <Switch
        value={value}
        thumbColor={value ? switchColor.on : switchColor.off}
        trackColor={{
          true: trackColor.on,
          false: trackColor.off
        }}
        {...switchProps}
      />
    </NativeViewGestureHandler>
  );
}
