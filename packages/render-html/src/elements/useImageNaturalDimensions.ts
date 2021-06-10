import { useState, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ImageDimensions } from '../shared-types';
import { UseIMGElementStateProps } from './img-types';

interface IncompleteImageDimensions {
  width: number | null;
  height: number | null;
}

function normalizeSize(
  dimension: string | number | null | undefined,
  options: Partial<{
    containerDimension: number | null;
    enablePercentWidth: boolean;
  }>
) {
  const containerDimension = options.containerDimension || null;
  const enablePercentWidth = options.enablePercentWidth || false;
  if (
    dimension === null ||
    dimension === undefined ||
    Number.isNaN(dimension)
  ) {
    return null;
  }
  if (typeof dimension === 'number') {
    return dimension;
  }
  if (
    dimension.search('%') !== -1 &&
    enablePercentWidth &&
    typeof containerDimension === 'number'
  ) {
    return (parseFloat(dimension) * containerDimension) / 100;
  } else if (dimension.trim().match(/^[\d.]+$/)) {
    return parseFloat(dimension);
  }
  return null;
}

/**
 * Extract specified dimensions from props.
 */
function deriveSpecifiedDimensionsFromProps({
  width,
  height,
  contentWidth,
  flatStyle,
  enableExperimentalPercentWidth: enablePercentWidth
}: Pick<
  UseIMGElementStateProps,
  'width' | 'height' | 'contentWidth' | 'enableExperimentalPercentWidth'
> & { flatStyle: Record<string, any> }): IncompleteImageDimensions {
  const normalizeOptionsWidth = {
    enablePercentWidth,
    containerDimension: contentWidth
  };
  const normalizeOptionsHeight = {
    enablePercentWidth: false
  };
  const widthProp = normalizeSize(width, normalizeOptionsWidth);
  const heightProp = normalizeSize(height, normalizeOptionsHeight);
  const styleWidth = normalizeSize(flatStyle.width, normalizeOptionsWidth);
  const styleHeight = normalizeSize(flatStyle.height, normalizeOptionsHeight);
  return {
    width: styleWidth ?? widthProp,
    height: styleHeight ?? heightProp
  };
}

export default function useImageNaturalDimensions<
  P extends UseIMGElementStateProps
>(props: P) {
  const {
    source,
    contentWidth,
    enableExperimentalPercentWidth,
    width,
    height,
    style,
    cachedNaturalDimensions
  } = props;
  const [naturalDimensions, setNaturalDimensions] = useState<
    P['cachedNaturalDimensions'] extends ImageDimensions
      ? ImageDimensions
      : ImageDimensions | null
  >((cachedNaturalDimensions as any) || null);
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const { width: cachedNaturalWidth, height: cachedNaturalHeight } =
    cachedNaturalDimensions || {};
  const specifiedDimensions = useMemo(
    () =>
      deriveSpecifiedDimensionsFromProps({
        contentWidth,
        enableExperimentalPercentWidth,
        width,
        height,
        flatStyle
      }),
    [contentWidth, enableExperimentalPercentWidth, flatStyle, height, width]
  );
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
    specifiedDimensions,
    flatStyle,
    error
  };
}
