import React, {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  useMemo
} from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import GenericPressable from '../GenericPressable';
import { IMGElementProps } from './img-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

/**
 * Container for the {@link IMGElement} component.
 */
export default function IMGElementContainer({
  style,
  onPress,
  testID,
  children,
  ...otherProps
}: PropsWithChildren<
  Pick<IMGElementProps, 'onPress' | 'testID'> &
    Omit<ViewProps, 'style'> & { style: ViewStyle }
>): ReactElement {
  const containerStyle = useMemo(() => {
    const { width, height, ...remainingStyle } = style;
    return [styles.container, remainingStyle];
  }, [style]);
  const Container: ComponentType<any> =
    typeof onPress === 'function' ? GenericPressable : View;
  return React.createElement(
    Container,
    { ...otherProps, style: containerStyle, onPress, testID },
    children
  );
}
