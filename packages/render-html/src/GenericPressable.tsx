import React, { PropsWithChildren } from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { DEFAULT_PRESSABLE_RIPPLE_COLOR } from './constants';
import { useSharedProps } from './context/SharedPropsProvider';
import { GenericPressableProps } from './shared-types';

export default function GenericPressable({
  style,
  children,
  borderless = false,
  ...otherProps
}: PropsWithChildren<GenericPressableProps>) {
  const {
    pressableHightlightColor = DEFAULT_PRESSABLE_RIPPLE_COLOR,
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
        <View>{children}</View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableHighlight
      underlayColor={pressableHightlightColor}
      style={style}
      {...(otherProps as any)}>
      <View>{children}</View>
    </TouchableHighlight>
  );
}
