import { useMemo } from 'react';
import { ImageStyle } from 'react-native';
import { ImageDimensions } from '../shared-types';
import {
  IncompleteImageDimensions,
  UseIMGElementStateProps
} from './img-types';

export type ConcreteDimensionsProps = {
  flatStyle: ImageStyle;
  naturalDimensions: ImageDimensions | null;
  specifiedDimensions: IncompleteImageDimensions;
} & Pick<UseIMGElementStateProps, 'computeMaxWidth' | 'contentWidth'>;

function extractHorizontalSpace({
  marginHorizontal,
  leftMargin,
  rightMargin,
  margin
}: any) {
  const realLeftMargin = leftMargin || marginHorizontal || margin || 0;
  const realRightMargin = rightMargin || marginHorizontal || margin || 0;
  return realLeftMargin + realRightMargin;
}

function scaleUp(
  minDimensions: ImageDimensions,
  desiredDimensions: ImageDimensions
): ImageDimensions {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width < minDimensions.width) {
    return scaleUp(minDimensions, {
      width: minDimensions.width,
      height: minDimensions.width / aspectRatio
    });
  }
  if (desiredDimensions.height < minDimensions.height) {
    return scaleUp(minDimensions, {
      height: minDimensions.height,
      width: minDimensions.height * aspectRatio
    });
  }
  return desiredDimensions;
}

function scaleDown(
  maxDimensions: ImageDimensions,
  desiredDimensions: ImageDimensions
): ImageDimensions {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width > maxDimensions.width) {
    return scaleDown(maxDimensions, {
      width: maxDimensions.width,
      height: maxDimensions.width / aspectRatio
    });
  }
  if (desiredDimensions.height > maxDimensions.height) {
    return scaleDown(maxDimensions, {
      height: maxDimensions.height,
      width: maxDimensions.height * aspectRatio
    });
  }
  return desiredDimensions;
}

function scale(
  { minBox, maxBox }: { maxBox: ImageDimensions; minBox: ImageDimensions },
  originalBox: ImageDimensions
) {
  return scaleDown(maxBox, scaleUp(minBox, originalBox));
}

function computeConcreteDimensions(params: any) {
  const {
    computeMaxWidth,
    contentWidth,
    flattenStyles,
    naturalWidth,
    naturalHeight,
    specifiedWidth,
    specifiedHeight
  } = params;
  const horizontalSpace = extractHorizontalSpace(flattenStyles);
  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 0,
    minHeight = 0
  } = flattenStyles;
  const imagesMaxWidth =
    typeof contentWidth === 'number' ? computeMaxWidth(contentWidth) : Infinity;
  const minBox = {
    width: minWidth,
    height: minHeight
  };
  const maxBox = {
    width:
      Math.min(
        imagesMaxWidth,
        maxWidth,
        typeof specifiedWidth === 'number' ? specifiedWidth : Infinity
      ) - horizontalSpace,
    height: Math.min(
      typeof specifiedHeight === 'number' ? specifiedHeight : Infinity,
      maxHeight
    )
  };
  if (
    typeof specifiedWidth === 'number' &&
    typeof specifiedHeight === 'number'
  ) {
    return scale(
      { minBox, maxBox },
      {
        width: specifiedWidth,
        height: specifiedHeight
      }
    );
  }
  if (naturalWidth != null && naturalHeight != null) {
    return scale(
      { minBox, maxBox },
      {
        width: naturalWidth,
        height: naturalHeight
      }
    );
  }
  return null;
}

export default function useImageConcreteDimensions<
  P extends ConcreteDimensionsProps
>({
  flatStyle,
  naturalDimensions,
  specifiedDimensions,
  computeMaxWidth,
  contentWidth
}: P): P['naturalDimensions'] extends ImageDimensions
  ? ImageDimensions
  : ImageDimensions | null {
  return useMemo(() => {
    return computeConcreteDimensions({
      flattenStyles: flatStyle,
      computeMaxWidth,
      contentWidth,
      naturalWidth: naturalDimensions?.width,
      naturalHeight: naturalDimensions?.height,
      specifiedWidth: specifiedDimensions.width,
      specifiedHeight: specifiedDimensions.height
    }) as any;
  }, [
    computeMaxWidth,
    contentWidth,
    flatStyle,
    naturalDimensions,
    specifiedDimensions.height,
    specifiedDimensions.width
  ]);
}
