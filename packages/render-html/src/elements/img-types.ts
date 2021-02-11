import {
  ImageStyle,
  ImageURISource,
  PressableProps,
  StyleProp,
  ViewStyle
} from 'react-native';
import { ImageDimensions } from '../shared-types';

export type UseIMGElementStateWithCacheProps = UseIMGElementStateProps &
  Required<Pick<UseIMGElementStateProps, 'cachedNaturalDimensions'>>;

export interface UseIMGElementStateProps {
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
   */
  initialDimensions?: ImageDimensions;
  /**
   * When the natural ("physical") dimensions for this image are accessible a
   * priori, these should be passed. It will save some API calls and filesytem
   * access via React Native Image.getSize.
   */
  cachedNaturalDimensions?: ImageDimensions;
}

export interface IMGElementProps extends UseIMGElementStateProps {
  style?: StyleProp<ImageStyle>;
  testID?: string;
  onPress?: PressableProps['onPress'];
  enableExperimentalPercentWidth?: boolean;
  initialDimensions?: ImageDimensions;
}

export type IMGElementState =
  | IMGElementStateError
  | IMGElementStateSuccess
  | IMGElementStateLoading;

export interface IMGElementStateBase {
  containerStyle: ViewStyle;
  dimensions: ImageDimensions;
  source: ImageURISource;
  alt?: string;
  altColor?: string;
}
export interface IMGElementStateSuccess extends IMGElementStateBase {
  type: 'success';
  /**
   * Image-only style extracted from `IMGElement.style` prop.
   */
  imageStyle: ImageStyle;
  /**
   * This callback should be passed down to the underlying image component.
   *
   * @remarks In quite frequent circumstances, the image won't be pre-fetched
   * because its concrete dimensions can be determined immediately. For
   * example, when both width and height are provide as attributes. So the
   * first state s0 of this state machine can be "success", and the second
   * state s1 be "error".
   */
  onError: (error: Error) => void;
}

export interface IMGElementStateLoading extends IMGElementStateBase {
  type: 'loading';
}

export interface IMGElementStateError extends IMGElementStateBase {
  type: 'error';
  error: Error;
}
