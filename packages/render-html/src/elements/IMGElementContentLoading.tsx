import React from 'react';
import { View } from 'react-native';
import { IMGElementStateLoading } from './img-types';

export default function IMGElementContentLoading({
  dimensions
}: IMGElementStateLoading) {
  return <View style={dimensions} testID="image-placeholder" />;
}
