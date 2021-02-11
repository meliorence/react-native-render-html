import React, { PropsWithChildren } from 'react';
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

export default function IMGElementContentAlt({
  dimensions,
  alt,
  altColor,
  testID,
  children
}: PropsWithChildren<IMGElementStateBase & { testID?: string }>) {
  return (
    <View
      style={[styles.altBox, dimensions, { borderColor: altColor }]}
      accessibilityRole="image"
      accessibilityLabel={alt}
      testID={testID}>
      {alt ? (
        <Text style={[styles.altText, { color: altColor }]}>{alt}</Text>
      ) : (
        false
      )}
      {children}
    </View>
  );
}
