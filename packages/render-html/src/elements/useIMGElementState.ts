import { useEffect, useState } from 'react';
import { Image, ImageURISource } from 'react-native';
import {
  UseIMGElementStateProps,
  IMGElementState,
  IncompleteImageDimensions
} from './img-types';
import defaultImageInitialDimensions from './defaultInitialImageDimensions';
import useIMGNormalizedSource from './useIMGNormalizedSource';
import { ImageDimensions } from '../shared-types';
import useImageConcreteDimensions from './useImageConcreteDimensions';
import { getIMGState } from './getIMGState';
import useImageSpecifiedDimensions from './useImageSpecifiedDimensions';

function getImageSizeAsync({
  uri,
  headers
}: {
  headers: any;
  uri: string;
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

function useImageNaturalDimensions<P extends UseIMGElementStateProps>(props: {
  cachedNaturalDimensions?: ImageDimensions;
  source: ImageURISource;
  specifiedDimensions: IncompleteImageDimensions;
}) {
  const { source, cachedNaturalDimensions } = props;
  const [naturalDimensions, setNaturalDimensions] = useState<
    P['cachedNaturalDimensions'] extends ImageDimensions
      ? ImageDimensions
      : ImageDimensions | null
  >((cachedNaturalDimensions as any) || null);
  const { width: cachedNaturalWidth, height: cachedNaturalHeight } =
    cachedNaturalDimensions || {};
  const [error, setError] = useState<null | Error>(null);
  useEffect(
    function resetOnURIChange() {
      setNaturalDimensions(
        (cachedNaturalWidth != null && cachedNaturalHeight != null
          ? { width: cachedNaturalWidth, height: cachedNaturalHeight }
          : null) as any
      );
      setError(null);
    },
    [cachedNaturalHeight, cachedNaturalWidth, source.uri]
  );
  return {
    onNaturalDimensions: setNaturalDimensions,
    onError: setError,
    naturalDimensions,
    error
  };
}

function useFetchedNaturalDimensions(props: {
  cachedNaturalDimensions?: ImageDimensions;
  source: ImageURISource;
  specifiedDimensions: IncompleteImageDimensions;
}) {
  const { source, cachedNaturalDimensions } = props;
  const { error, naturalDimensions, onError, onNaturalDimensions } =
    useImageNaturalDimensions(props);
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
    initialDimensions = defaultImageInitialDimensions,
    cachedNaturalDimensions
  } = props;
  const { flatStyle, specifiedDimensions } = useImageSpecifiedDimensions(props);
  const nomalizedSource = useIMGNormalizedSource({
    specifiedDimensions,
    source
  });
  const { naturalDimensions, onError, error } = useFetchedNaturalDimensions({
    source: nomalizedSource,
    specifiedDimensions,
    cachedNaturalDimensions
  });
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
    source: nomalizedSource
  });
}
