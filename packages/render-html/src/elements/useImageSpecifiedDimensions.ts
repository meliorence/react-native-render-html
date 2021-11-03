import { useMemo } from 'react';
import {
  UseIMGElementStateProps,
  IncompleteImageDimensions
} from './img-types';
import getDimensionsWithAspectRatio from './getDimensionsWithAspectRatio';
import { StyleSheet } from 'react-native';

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
  return getDimensionsWithAspectRatio(
    styleWidth ?? widthProp,
    styleHeight ?? heightProp,
    flatStyle.aspectRatio
  );
}

export default function useImageSpecifiedDimensions(
  props: UseIMGElementStateProps
) {
  const { contentWidth, enableExperimentalPercentWidth, style, width, height } =
    props;
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
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
  return { flatStyle, specifiedDimensions };
}
