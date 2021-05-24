import React, {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  useMemo
} from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
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
  children
}: PropsWithChildren<
  Pick<IMGElementProps, 'onPress' | 'testID'> & { style: ViewStyle }
>): ReactElement {
  const containerStyle = useMemo(() => {
    const { width, height, ...remainingStyle } = style;
    return [styles.container, remainingStyle];
  }, [style]);
  const Container: ComponentType<any> =
    typeof onPress === 'function' ? GenericPressable : View;
  return React.createElement(
    Container,
    { style: containerStyle, onPress, testID },
    children
  );
}
