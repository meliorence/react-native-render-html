import React, {
  Children,
  Fragment,
  PropsWithChildren,
  useContext
} from 'react';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import gestureHandlerContextNucleon from './gestureHandlerContextNucleon';
import {
  AccessibilityProps,
  Platform,
  TouchableWithoutFeedbackProps
} from 'react-native';

const Passthrough = ({ children, onPress }: PropsWithChildren<any>) =>
  React.createElement(
    Fragment,
    {},
    Children.map(children, (c) =>
      React.cloneElement(c, { onPress, ...c.props })
    )
  );

/**
 * This is an adapter for pressable children of
 * @gorhom/react-native-bottom-sheet component which doesn't allow proper
 * handling of press events an Android.
 *
 * @param props - The props to pass to the underlying adapter
 */
export default function GestureHandlerAdapterNucleon<
  P extends {
    onPress?: TouchableWithoutFeedbackProps['onPress'];
  } & AccessibilityProps
>(props: P) {
  const isInBottomSheet = useContext(gestureHandlerContextNucleon);
  const shouldWrap = isInBottomSheet && Platform.OS === 'android';
  const WrapperTouchComponent = shouldWrap
    ? (TouchableHighlight as any)
    : Passthrough;

  return React.createElement(WrapperTouchComponent, {
    ...props,
    accessibilityElementsHidden: shouldWrap
  });
}
