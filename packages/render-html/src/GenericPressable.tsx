import React, { PropsWithChildren } from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { useSharedProps } from './context/SharedPropsProvider';
import { GenericPressableProps } from './shared-types';

export default function GenericPressable({
  style,
  children,
  borderless = false,
  ...otherProps
}: PropsWithChildren<GenericPressableProps>) {
  const {
    pressableHightlightColor,
    GenericPressable: UserProvidedPressable
  } = useSharedProps();
  if (UserProvidedPressable) {
    return (
      <UserProvidedPressable style={style} {...(otherProps as any)}>
        {children}
      </UserProvidedPressable>
    );
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple(
          pressableHightlightColor,
          borderless
        )}
        style={style}
        {...(otherProps as any)}>
        <View testID="generic-pressable">{children}</View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableHighlight
      underlayColor={pressableHightlightColor}
      style={style}
      {...(otherProps as any)}>
      <View testID="generic-pressable">{children}</View>
    </TouchableHighlight>
  );
}
