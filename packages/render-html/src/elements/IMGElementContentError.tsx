import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IMGElementStateError } from './img-types';

const styles = StyleSheet.create({
  errorBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  errorText: { textAlign: 'center', fontStyle: 'italic' }
});

export default function IMGElementContentError({
  imageBoxDimensions,
  alt,
  altColor
}: IMGElementStateError) {
  return (
    <View style={[styles.errorBox, imageBoxDimensions]} testID="image-error">
      {alt ? (
        <Text style={[styles.errorText, { color: altColor }]}>{alt}</Text>
      ) : (
        false
      )}
    </View>
  );
}
