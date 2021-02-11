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
  IMGElementLoaderProps,
  'width' | 'height' | 'contentWidth' | 'enableExperimentalPercentWidth'
> & { flatStyle: Record<string, any> }): IncompleteImgDimensions {
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

const extractImgStyleProps = pick<keyof ImageStyle>([
  'resizeMode',
  'tintColor',
  'overlayColor'
]);

function useNaturalDimensions({
  source,
  contentWidth,
  enableExperimentalPercentWidth,
  width,
  height,
  style,
  cachedNaturalDimensions
}: IMGElementLoaderProps) {
  const [
    naturalDimensions,
    setNaturalDimensions
  ] = useState<ImgDimensions | null>(cachedNaturalDimensions || null);
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const hasCachedDimensions = !!cachedNaturalDimensions;
  const cachedNaturalWidth = cachedNaturalDimensions?.width;
  const cachedNaturalHeight = cachedNaturalDimensions?.height;
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
    function fetchPhysicalDimensions() {
      let cancelled = false;
      if (source.uri && !hasCachedDimensions) {
        Image.getSizeWithHeaders(
          source.uri,
          source.headers || {},
          (w, h) => {
            !cancelled && setNaturalDimensions({ width: w, height: h });
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
      setNaturalDimensions(
        cachedNaturalWidth != null && cachedNaturalHeight != null
          ? { width: cachedNaturalWidth, height: cachedNaturalHeight }
          : null
      );
      setError(null);
    },
    [cachedNaturalHeight, cachedNaturalWidth, source.uri]
  );
  return {
    specifiedDimensions,
    flatStyle,
    naturalDimensions,
    error
  };
}

export const defaultInitialDimensions: ImgDimensions = {
  width: 100,
  height: 100
};

export default function useIMGElementLoader(
  props: IMGElementLoaderProps
): IMGElementState {
  const {
    alt,
    altColor,
    source,
    contentWidth,
    computeMaxWidth,
    initialDimensions = defaultInitialDimensions
  } = props;
  const {
    naturalDimensions,
    specifiedDimensions,
    flatStyle,
    error
  } = useNaturalDimensions(props);
  const concreteDimensions = useMemo(() => {
    return computeConcreteDimensions({
      flattenStyles: flatStyle,
      computeMaxWidth,
      contentWidth,
      naturalWidth: naturalDimensions?.width,
      naturalHeight: naturalDimensions?.height,
      specifiedWidth: specifiedDimensions.width,
      specifiedHeight: specifiedDimensions.height
    });
  }, [
    computeMaxWidth,
    contentWidth,
    flatStyle,
    naturalDimensions,
    specifiedDimensions.height,
    specifiedDimensions.width
  ]);
  return error
    ? {
        type: 'error',
        alt,
        altColor,
        error,
        containerStyle: flatStyle,
        dimensions: concreteDimensions ?? initialDimensions
      }
    : concreteDimensions
    ? {
        type: 'success',
        containerStyle: flatStyle as any,
        imageStyle: extractImgStyleProps(flatStyle),
        dimensions: concreteDimensions,
        source
      }
    : {
        type: 'loading',
        containerStyle: flatStyle,
        dimensions: initialDimensions
      };
}
