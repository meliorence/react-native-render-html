import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { IMGElementStateSuccess } from './img-types';

const defaultImageStyle: ImageStyle = { resizeMode: 'cover' };

export default function IMGElementContentSuccess({
  source,
  imageStyle,
  imageBoxDimensions
}: IMGElementStateSuccess) {
  return (
    <Image
      source={source}
      style={[defaultImageStyle, imageBoxDimensions, imageStyle]}
      testID="image-layout"
    />
  );
}
