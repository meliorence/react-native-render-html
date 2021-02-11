import defaultImageInitialDimensions from './defaultInitialImageDimensions';
import extractImageStyleProps from './extractImageStyleProps';
import type {
  UseIMGElementStateWithCacheProps,
  IMGElementStateError,
  IMGElementStateSuccess
} from './img-types';
import useImageConcreteDimensions from './useImageConcreteDimensions';
import useImageNaturalDimensions from './useImageNaturalDimensions';

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
    initialDimensions = defaultImageInitialDimensions
  } = props;
  const {
    naturalDimensions,
    specifiedDimensions,
    flatStyle,
    error,
    onError
  } = useImageNaturalDimensions(props);
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
        error,
        source,
        containerStyle: flatStyle,
        dimensions: concreteDimensions ?? initialDimensions
      }
    : {
        type: 'success',
        alt,
        altColor,
        containerStyle: flatStyle as any,
        imageStyle: extractImageStyleProps(flatStyle),
        dimensions: concreteDimensions,
        source,
        onError
      };
}
