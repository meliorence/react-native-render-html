import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Pressable,
  ViewProps,
  PressableProps,
  StyleProp,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  pressed: {
    opacity: Platform.select({ default: 0.8 })
  }
});

export interface GenericPressableProps
  extends Pick<PressableProps, 'onPress' | 'hitSlop'> {
  key?: string | number;
  style?: StyleProp<any>;
  borderless?: boolean;
}

export default function GenericPressable({
  key,
  onPress,
  style,
  children,
  hitSlop,
  borderless = false
}: PropsWithChildren<GenericPressableProps>) {
  return (
    <Pressable
      key={key}
      android_ripple={{ borderless, color: 'blue' }}
      style={({ pressed }) => [style, pressed && styles.pressed]}
      onPress={onPress}
      hitSlop={hitSlop}>
      {children}
    </Pressable>
  );
}
