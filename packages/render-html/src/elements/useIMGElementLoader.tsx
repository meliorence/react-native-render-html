import { useEffect, useMemo, useState } from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import pick from 'ramda/src/pick';
import type {
  IMGElementLoaderProps,
  IncompleteImgDimensions,
  ImgDimensions,
  IMGElementState
} from './img-types';

function attemptParseFloat(value: any) {
  const result = parseFloat(value);
  return Number.isNaN(result) ? null : result;
}

function normalizeSize(
  dimension: string | number | null | undefined,
  options: Partial<{
    containerDimension: number | null;
    enablePercentWidth: boolean;
  }> = {}
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
  if (typeof dimension === 'string') {
    if (
      dimension.search('%') !== -1 &&
      enablePercentWidth &&
      typeof containerDimension === 'number'
    ) {
      const parsedFloat = attemptParseFloat(dimension);
      if (parsedFloat === null || Number.isNaN(parsedFloat)) {
        return null;
      }
      return (parsedFloat * containerDimension) / 100;
    } else if (dimension.trim().match(/^[\d.]+$/)) {
      return attemptParseFloat(dimension);
    }
  }
  return null;
}

function extractHorizontalSpace({
  marginHorizontal,
  leftMargin,
  rightMargin,
  margin
}: any = {}) {
  const realLeftMargin = leftMargin || marginHorizontal || margin || 0;
  const realRightMargin = rightMargin || marginHorizontal || margin || 0;
  return realLeftMargin + realRightMargin;
}

function derivePhysicalDimensionsFromProps({
  width,
  height,
  contentWidth,
  enableExperimentalPercentWidth: enablePercentWidth
}: Pick<
  IMGElementLoaderProps,
  'width' | 'height' | 'contentWidth' | 'enableExperimentalPercentWidth'
>): IncompleteImgDimensions {
  const normalizeOptionsWidth = {
    enablePercentWidth,
    containerDimension: contentWidth
  };
  const normalizeOptionsHeight = {
    enablePercentWidth: false
  };
  const widthProp = normalizeSize(width, normalizeOptionsWidth);
  const heightProp = normalizeSize(height, normalizeOptionsHeight);
  return {
    width: widthProp,
    height: heightProp
  };
}

function deriveRequiredDimensionsFromProps({
  enablePercentWidth,
  contentWidth,
  flatStyle,
  physicalDimensionsFromProps
}: Pick<IMGElementLoaderProps, 'contentWidth'> & {
  flatStyle: Record<string, any>;
  enablePercentWidth?: boolean;
  physicalDimensionsFromProps: IncompleteImgDimensions;
}): IncompleteImgDimensions {
  const normalizeOptionsWidth = {
    enablePercentWidth,
    containerDimension: contentWidth
  };
  const normalizeOptionsHeight = {
    enablePercentWidth: false
  };
  const styleWidth = normalizeSize(flatStyle.width, normalizeOptionsWidth);
  const styleHeight = normalizeSize(flatStyle.height, normalizeOptionsHeight);
  return {
    width:
      typeof styleWidth === 'number'
        ? styleWidth
        : physicalDimensionsFromProps.width,
    height:
      typeof styleHeight === 'number'
        ? styleHeight
        : physicalDimensionsFromProps.height
  };
}

function scaleUp(
  minDimensions: ImgDimensions,
  desiredDimensions: ImgDimensions
): ImgDimensions {
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
  maxDimensions: ImgDimensions,
  desiredDimensions: ImgDimensions
): ImgDimensions {
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
  { minBox, maxBox }: { minBox: ImgDimensions; maxBox: ImgDimensions },
  originalBox: ImgDimensions
) {
  return scaleDown(maxBox, scaleUp(minBox, originalBox));
}

function computeImageBoxDimensions(params: any) {
  const {
    computeImagesMaxWidth,
    contentWidth,
    flattenStyles,
    imagePhysicalWidth,
    imagePhysicalHeight,
    requiredWidth,
    requiredHeight
  } = params;
  const horizontalSpace = extractHorizontalSpace(flattenStyles);
  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 0,
    minHeight = 0
  } = flattenStyles;
  const imagesMaxWidth =
    typeof contentWidth === 'number'
      ? computeImagesMaxWidth(contentWidth)
      : Infinity;
  const minBox = {
    width: minWidth,
    height: minHeight
  };
  const maxBox = {
    width:
      Math.min(
        imagesMaxWidth,
        maxWidth,
        typeof requiredWidth === 'number' ? requiredWidth : Infinity
      ) - horizontalSpace,
    height: Math.min(
      typeof requiredHeight === 'number' ? requiredHeight : Infinity,
      maxHeight
    )
  };
  if (typeof requiredWidth === 'number' && typeof requiredHeight === 'number') {
    return scale(
      { minBox, maxBox },
      {
        width: requiredWidth,
        height: requiredHeight
      }
    );
  }
  if (imagePhysicalWidth != null && imagePhysicalHeight != null) {
    return scale(
      { minBox, maxBox },
      {
        width: imagePhysicalWidth,
        height: imagePhysicalHeight
      }
    );
  }
  return null;
}

function isPlainImgDimensions(
  imgDimensions: IncompleteImgDimensions
): imgDimensions is ImgDimensions {
  return imgDimensions.width != null && imgDimensions.height != null;
}

const extractImgStyleProps = pick<keyof ImageStyle>([
  'resizeMode',
  'tintColor',
  'overlayColor'
]);

function usePhysicalDimensions({
  source,
  contentWidth,
  enableExperimentalPercentWidth,
  width,
  height,
  style,
  cachedNaturalDimensions
}: IMGElementLoaderProps) {
  const [
    physicalDimensions,
    setPhysicalDimensions
  ] = useState<ImgDimensions | null>(cachedNaturalDimensions || null);
  const hasCachedDimensions = !!cachedNaturalDimensions;
  const cachedNaturalWidth = cachedNaturalDimensions?.width;
  const cachedNaturalHeight = cachedNaturalDimensions?.height;
  const physicalDimensionsFromProps = useMemo(
    () =>
      derivePhysicalDimensionsFromProps({
        contentWidth,
        enableExperimentalPercentWidth,
        width,
        height
      }),
    [contentWidth, enableExperimentalPercentWidth, height, width]
  );
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const requirements = useMemo(
    function computeRequirements() {
      return deriveRequiredDimensionsFromProps({
        enablePercentWidth: enableExperimentalPercentWidth,
        flatStyle,
        contentWidth,
        physicalDimensionsFromProps
      });
    },
    [
      contentWidth,
      enableExperimentalPercentWidth,
      flatStyle,
      physicalDimensionsFromProps
    ]
  );
  const [error, setError] = useState<null | Error>(null);
  useEffect(
    function fetchPhysicalDimensions() {
      let cancelled = false;
      if (source.uri && !hasCachedDimensions) {
        Image.getSizeWithHeaders(
          source.uri,
          source.headers || {},
          (w, h) => {
            !cancelled && setPhysicalDimensions({ width: w, height: h });
          },
          (e) => {
            !cancelled && setError(e || {});
          }
        );
        return () => {
          cancelled = true;
        };
      }
    },
    [source.uri, source.headers, hasCachedDimensions]
  );
  useEffect(
    function resetOnURIChange() {
      setPhysicalDimensions(
        cachedNaturalWidth != null && cachedNaturalHeight != null
          ? { width: cachedNaturalWidth, height: cachedNaturalHeight }
          : null
      );
      setError(null);
    },
    [cachedNaturalHeight, cachedNaturalWidth, source.uri]
  );
  return {
    requirements,
    flatStyle,
    physicalDimensions: isPlainImgDimensions(physicalDimensionsFromProps)
      ? physicalDimensionsFromProps
      : physicalDimensions,
    error: error
  };
}

export default function useIMGElementLoader(
  props: IMGElementLoaderProps
): IMGElementState {
  const {
    alt,
    altColor,
    source,
    contentWidth,
    computeImagesMaxWidth,
    imagesInitialDimensions
  } = props;
  const {
    physicalDimensions,
    requirements,
    flatStyle,
    error
  } = usePhysicalDimensions(props);
  const imageBoxDimensions = useMemo(() => {
    if (physicalDimensions) {
      return computeImageBoxDimensions({
        flattenStyles: flatStyle,
        computeImagesMaxWidth,
        contentWidth,
        imagePhysicalWidth: physicalDimensions?.width,
        imagePhysicalHeight: physicalDimensions?.height,
        requiredWidth: requirements.width,
        requiredHeight: requirements.height
      });
    }
    return null;
  }, [
    computeImagesMaxWidth,
    contentWidth,
    flatStyle,
    physicalDimensions,
    requirements.height,
    requirements.width
  ]);
  return error
    ? {
        type: 'error',
        alt,
        altColor,
        error,
        containerStyle: flatStyle,
        imageBoxDimensions: imageBoxDimensions ?? imagesInitialDimensions!
      }
    : imageBoxDimensions
    ? {
        type: 'success',
        containerStyle: flatStyle as any,
        imageStyle: extractImgStyleProps(flatStyle),
        imageBoxDimensions,
        source
      }
    : {
        type: 'loading',
        containerStyle: flatStyle,
        imageBoxDimensions: imagesInitialDimensions!
      };
}
