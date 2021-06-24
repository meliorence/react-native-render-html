import { useEffect } from 'react';
import { Image } from 'react-native';
import type { UseIMGElementStateProps, IMGElementState } from './img-types';
import useImageNaturalDimensions from './useImageNaturalDimensions';
import useImageConcreteDimensions from './useImageConcreteDimensions';
import defaultImageInitialDimensions from './defaultInitialImageDimensions';
import { ImageDimensions } from '../shared-types';
import { getIMGState } from './getIMGState';

function getImageSizeAsync({
  uri,
  headers
}: {
  uri: string;
  headers: any;
}): Promise<ImageDimensions> {
  return new Promise<ImageDimensions>((onsuccess, onerror) => {
    const onImageDimensionsSuccess = (width: number, height: number) =>
      onsuccess({ width, height });
    if (headers) {
      Image.getSizeWithHeaders(uri, headers, onImageDimensionsSuccess, onerror);
    } else {
      Image.getSize(uri, onImageDimensionsSuccess, onerror);
    }
  });
}

function useFetchedNaturalDimensions(props: UseIMGElementStateProps) {
  const { source, cachedNaturalDimensions } = props;
  const {
    error,
    flatStyle,
    naturalDimensions,
    specifiedDimensions,
    onError,
    onNaturalDimensions
  } = useImageNaturalDimensions(props);
  const hasCachedDimensions = !!cachedNaturalDimensions;
  useEffect(
    function fetchPhysicalDimensions() {
      let cancelled = false;
      if (source.uri && !hasCachedDimensions) {
        getImageSizeAsync({ uri: source.uri, headers: source.headers })
          .then((dimensions) => !cancelled && onNaturalDimensions(dimensions))
          .catch((e) => !cancelled && onError(e || {}));
        return () => {
          cancelled = true;
        };
      }
    },
    [
      source.uri,
      source.headers,
      onNaturalDimensions,
      onError,
      hasCachedDimensions
    ]
  );
  return {
    specifiedDimensions,
    flatStyle,
    naturalDimensions,
    error,
    onError,
    onNaturalDimensions
  };
}

/**
 * This hook will compute concrete dimensions from image natural dimensions and
 * constraints. It will fetch the image and get its dimensions.
 *
 * @remarks If you know the dimensions beforehand, use
 * {@link useIMGElementStateWithCache} instead to save a network request and
 * prevent a layout shift.
 */
export default function useIMGElementState(
  props: UseIMGElementStateProps
): IMGElementState {
  const {
    alt,
    altColor,
    source,
    contentWidth,
    computeMaxWidth,
    objectFit,
    initialDimensions = defaultImageInitialDimensions
  } = props;
  const { naturalDimensions, specifiedDimensions, flatStyle, onError, error } =
    useFetchedNaturalDimensions(props);
  const concreteDimensions = useImageConcreteDimensions({
    flatStyle,
    naturalDimensions,
    specifiedDimensions,
    computeMaxWidth,
    contentWidth
  });
  return getIMGState({
    error,
    alt,
    altColor,
    concreteDimensions,
    containerStyle: flatStyle,
    initialDimensions,
    objectFit,
    onError,
    source
  });
}
