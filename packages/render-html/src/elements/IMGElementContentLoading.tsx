import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import { IMGElementStateLoading } from './img-types';

/**
 * Default loading view for the {@link IMGElement} component.
 */
export default function IMGElementContentLoading({
  dimensions,
  alt,
  testID,
  children
}: PropsWithChildren<
  IMGElementStateLoading & { testID?: string }
>): ReactElement {
  return (
    <View
      style={dimensions}
      accessibilityRole="image"
      accessibilityLabel={alt}
      testID={testID}>
      {children}
    </View>
  );
}
