import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  pressed: {
    opacity: Platform.select({ default: 0.8 })
  }
});

export interface GenericPressableProps extends PressableProps {
  style?: StyleProp<any>;
  borderless?: boolean;
}

export default function GenericPressable({
  onPress,
  style,
  children,
  hitSlop,
  borderless = false,
  ...otherProps
}: PropsWithChildren<GenericPressableProps>) {
  return (
    <Pressable
      android_ripple={{ borderless, color: 'blue' }}
      style={({ pressed }) => [style, pressed && styles.pressed]}
      onPress={onPress}
      hitSlop={hitSlop}
      {...otherProps}>
      {children}
    </Pressable>
  );
}
