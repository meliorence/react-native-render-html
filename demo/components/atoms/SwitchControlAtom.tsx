import React from 'react';
import { SwitchProps, Switch } from 'react-native';
import { useComponentColors } from '../../state/ThemeProvider';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

export type SwitchControlAtomProps = Omit<
  SwitchProps,
  'tintColor' | 'trackColor' | 'thumbColor'
>;

export default function SwitchControlAtom({
  value,
  ...switchProps
}: SwitchControlAtomProps) {
  const colors = useComponentColors('controls');
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <Switch
        value={value}
        thumbColor={value ? colors.tintColorOn : colors.tintColorOff}
        trackColor={{
          true: colors.trackColorOn,
          false: colors.trackColorOff
        }}
        {...switchProps}
      />
    </NativeViewGestureHandler>
  );
}
