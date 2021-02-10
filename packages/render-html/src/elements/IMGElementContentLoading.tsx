import React from 'react';
import { View } from 'react-native';
import { IMGElementStateLoading } from './img-types';

export default function IMGElementContentLoading({
  imageBoxDimensions
}: IMGElementStateLoading) {
  return <View style={imageBoxDimensions} testID="image-placeholder" />;
}
