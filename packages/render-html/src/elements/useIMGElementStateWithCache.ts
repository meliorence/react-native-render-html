import defaultImageInitialDimensions from './defaultInitialImageDimensions';
import { getIMGState } from './getIMGState';
import type {
  UseIMGElementStateWithCacheProps,
  IMGElementStateError,
  IMGElementStateSuccess
} from './img-types';
import useImageConcreteDimensions from './useImageConcreteDimensions';
import useImageSpecifiedDimensions from './useImageSpecifiedDimensions';
import useIMGNormalizedSource from './useIMGNormalizedSource';

/**
 * This hook is useful when one has access to image natural dimensions prior to
 * loading. The `cachedNaturalDimensions` prop must be passed to immediately
 * compute concrete dimensions.
 */
export default function useIMGElementStateWithCache(
  props: UseIMGElementStateWithCacheProps
): IMGElementStateError | IMGElementStateSuccess {
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
  const concreteDimensions = useImageConcreteDimensions({
    flatStyle,
    naturalDimensions: cachedNaturalDimensions,
    specifiedDimensions,
    computeMaxWidth,
    contentWidth
  });

  return getIMGState({
    error: null,
    concreteDimensions,
    containerStyle: flatStyle,
    initialDimensions,
    objectFit,
    source: nomalizedSource,
    alt,
    altColor
  });
}
