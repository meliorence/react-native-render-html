import {
  ImageStyle,
  ImageURISource,
  PressableProps,
  StyleProp,
  ViewStyle
} from 'react-native';

export interface ImgDimensions {
  width: number;
  height: number;
}

export interface IncompleteImgDimensions {
  width: number | null;
  height: number | null;
}

export interface IMGElementLoaderProps {
  alt?: string;
  altColor?: string;
  source: ImageURISource;
  height?: string | number;
  width?: string | number;
  style?: StyleProp<ImageStyle>;
  computeMaxWidth?: (containerWidth: number) => number;
  contentWidth?: number;
  enableExperimentalPercentWidth?: boolean;
  /**
   * Rendered dimensions prior to retrieving natural dimensions of the image.
   *
   * @remarks When `cachedNaturalDimensions` prop is provided, concrete
   * dimensions for this image will be immediately rendered.
   */
  initialDimensions?: ImgDimensions;
  /**
   * When the natural ("physical") dimensions for this image are accessible a
   * priori, these should be passed. It will save some API calls and filesytem
   * access via React Native Image.getSize.
   */
  cachedNaturalDimensions?: ImgDimensions;
}

export interface IMGElementProps extends IMGElementLoaderProps {
  style?: StyleProp<ImageStyle>;
  testID?: string;
  onPress?: PressableProps['onPress'];
  enableExperimentalPercentWidth?: boolean;
  initialDimensions?: ImgDimensions;
}

export type IMGElementState =
  | IMGElementStateError
  | IMGElementStateSuccess
  | IMGElementStateLoading;

export interface IMGElementStateSuccess {
  type: 'success';
  containerStyle: ViewStyle;
  /**
   * Image-only style extracted from `IMGElement.style` prop.
   */
  imageStyle: ImageStyle;
  /**
   * The concrete (to be displayed) image dimensions.
   */
  dimensions: ImgDimensions;
  source: ImageURISource;
}

export interface IMGElementStateLoading {
  type: 'loading';
  containerStyle: ViewStyle;
  /**
   * Initial dimensions.
   */
  dimensions: ImgDimensions;
}

export interface IMGElementStateError {
  type: 'error';
  containerStyle: ViewStyle;
  error: Error;
  /**
   * Either the scaled image dimensions, or `initialDimensions` if the
   * later could not be determined.
   */
  dimensions: ImgDimensions;
  alt?: string;
  altColor?: string;
}
