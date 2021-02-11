import { useEffect } from 'react';
import { Image } from 'react-native';
import type { UseIMGElementStateProps, IMGElementState } from './img-types';
import useImageNaturalDimensions from './useImageNaturalDimensions';
import useImageConcreteDimensions from './useImageConcreteDimensions';
import defaultImageInitialDimensions from './defaultInitialImageDimensions';
import extractImageStyleProps from './extractImageStyleProps';

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
        Image.getSizeWithHeaders(
          source.uri,
          source.headers || {},
          (w, h) => {
            !cancelled && onNaturalDimensions({ width: w, height: h });
          },
          (e) => {
            !cancelled && onError(e || {});
          }
        );
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
 * This hook will compute concrete dimensions from
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
    initialDimensions = defaultImageInitialDimensions
  } = props;
  const {
    naturalDimensions,
    specifiedDimensions,
    flatStyle,
    onError,
    error
  } = useFetchedNaturalDimensions(props);
  const concreteDimensions = useImageConcreteDimensions({
    flatStyle,
    naturalDimensions,
    specifiedDimensions,
    computeMaxWidth,
    contentWidth
  });
  return error
    ? {
        type: 'error',
        alt,
        altColor,
        source,
        error,
        containerStyle: flatStyle,
        dimensions: concreteDimensions ?? initialDimensions
      }
    : concreteDimensions
    ? {
        type: 'success',
        alt,
        altColor,
        source,
        onError,
        containerStyle: flatStyle,
        imageStyle: extractImageStyleProps(flatStyle),
        dimensions: concreteDimensions
      }
    : {
        type: 'loading',
        alt,
        altColor,
        source,
        containerStyle: flatStyle,
        dimensions: initialDimensions
      };
}
