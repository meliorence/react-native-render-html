import React, { ReactElement, useCallback } from 'react';
import {
  Image,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent
} from 'react-native';
import { IMGElementStateSuccess } from './img-types';

const defaultImageStyle: ImageStyle = { resizeMode: 'cover' };

/**
 * Default success "image" view for the {@link IMGElement} component.
 */
export default function IMGElementContentSuccess({
  source,
  imageStyle,
  dimensions,
  onError
}: IMGElementStateSuccess): ReactElement {
  const onImageError = useCallback(
    ({ nativeEvent: { error } }: NativeSyntheticEvent<ImageErrorEventData>) =>
      onError(error),
    [onError]
  );
  return (
    <Image
      source={source}
      onError={onImageError}
      style={[defaultImageStyle, dimensions, imageStyle]}
      testID="image-success"
    />
  );
}
