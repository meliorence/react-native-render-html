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
  computeImagesMaxWidth?: (containerWidth: number) => number;
  contentWidth?: number;
  enableExperimentalPercentWidth?: boolean;
  imagesInitialDimensions?: ImgDimensions;
  /**
   * When the natural ("physical") dimensions for this image are accessible a
   * priori, these should be passed. It will save some API calls and filesytem
   * access via React Native Image.getSize.
   */
  cachedNaturalDimensions?: ImgDimensions;
}

export interface IMGElementProps extends IMGElementLoaderProps {
  key?: string | number;
  style?: StyleProp<ImageStyle>;
  testID?: string;
  onPress?: PressableProps['onPress'];
  enableExperimentalPercentWidth?: boolean;
  imagesInitialDimensions?: ImgDimensions;
}

export type IMGElementState =
  | IMGElementStateError
  | IMGElementStateSuccess
  | IMGElementStateLoading;

export interface IMGElementStateSuccess {
  type: 'success';
  containerStyle: ViewStyle;
  imageStyle: ImageStyle;
  /**
   * The scaled image dimensions, relative to `contentWidth`.
   */
  imageBoxDimensions: ImgDimensions;
  source: ImageURISource;
}

export interface IMGElementStateLoading {
  type: 'loading';
  containerStyle: ViewStyle;
  /**
   * The display dimensions for the image.
   * This value is set to `initialImageDimensions`
   * during loading.
   */
  imageBoxDimensions: ImgDimensions;
}

export interface IMGElementStateError {
  type: 'error';
  containerStyle: ViewStyle;
  error: Error;
  /**
   * Either the scaled image dimensions, or `initialImageDimensions` if the
   * later could not be determined.
   */
  imageBoxDimensions: ImgDimensions;
  alt?: string;
  altColor?: string;
}
