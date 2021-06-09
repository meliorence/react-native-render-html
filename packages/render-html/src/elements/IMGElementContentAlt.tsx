import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IMGElementStateBase } from './img-types';

const styles = StyleSheet.create({
  altBox: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  altText: { textAlign: 'center', fontStyle: 'italic' }
});

/**
 * Alt view for the {@link IMGElement} component.
 */
export default function IMGElementContentAlt({
  dimensions,
  alt,
  altColor,
  testID,
  children
}: PropsWithChildren<IMGElementStateBase & { testID?: string }>): ReactElement {
  return (
    <View
      style={[styles.altBox, dimensions, { borderColor: altColor }]}
      accessibilityRole="image"
      accessibilityLabel={alt}
      testID={testID}>
      <Text style={[styles.altText, { color: altColor }]}>{alt}</Text>
      {children}
    </View>
  );
}
