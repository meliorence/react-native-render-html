import {
  ImageStyle,
  ImageURISource,
  PressableProps,
  StyleProp,
  ViewStyle
} from 'react-native';
import { ImageDimensions } from '../shared-types';
import { WebBlockStyles } from '@native-html/transient-render-engine';

export type UseIMGElementStateWithCacheProps = UseIMGElementStateProps &
  Required<Pick<UseIMGElementStateProps, 'cachedNaturalDimensions'>>;

/**
 * Props for {@link useIMGElementState} hook.
 */
export interface UseIMGElementStateProps {
  /**
   * Alt text extract from `alt` attribute.
   */
  alt?: string;
  /**
   * Alt color, defaults to `color` for this {@link TNode}.
   */
  altColor?: string;
  /**
   * The source to paint.
   */
  source: ImageURISource;
  /**
   * The value of the `height` attribute.
   */
  height?: string | number;
  /**
   * The value of the `width` attribute.
   */
  width?: string | number;
  /**
   * The style for this image.
   */
  style?: StyleProp<ImageStyle>;
  /**
   * The value of the `object-fit` CSS property.
   */
  objectFit?: WebBlockStyles['objectFit'];
  /**
   * When provided, the print image will have a max width depending on the
   * `contentWidth` prop.
   */
  computeMaxWidth?: (contentWidth: number) => number;
  /**
   * The `contentWidth` from the {@link RenderHTMLProps}.
   */
  contentWidth?: number;
  /**
   * Allow experimental percent width for the print dimensions computation.
   * The percent will be relative to `contentWidth`
   */
  enableExperimentalPercentWidth?: boolean;
  /**
   * Rendered dimensions prior to retrieving natural dimensions of the image.
   */
  initialDimensions?: ImageDimensions;
  /**
   * When the natural ("physical") dimensions for this image are accessible *a
   * priori*, these should be passed. It will save some API calls and filesytem
   * access via React Native Image.getSize.
   */
  cachedNaturalDimensions?: ImageDimensions;
}

/**
 * Props for the {@link IMGElement} component.
 */
export interface IMGElementProps extends UseIMGElementStateProps {
  testID?: string;
  /**
   * A callback triggered on press.
   */
  onPress?: PressableProps['onPress'];
}

/**
 * The internal state used by {@link IMGElement}.
 */
export type IMGElementState =
  | IMGElementStateError
  | IMGElementStateSuccess
  | IMGElementStateLoading;

/**
 * Base fields for all {@link IMGElementState}.
 */
export interface IMGElementStateBase {
  /**
   * Styles of the container.
   */
  containerStyle: ViewStyle;
  /**
   * Physical dimensions of the image
   */
  dimensions: ImageDimensions;
  /**
   * The source to paint.
   */
  source: ImageURISource;
  /**
   * Alt text extract from `alt` attribute.
   */
  alt?: string;
  /**
   * Alt color, defaults to `color` for this {@link TNode}.
   */
  altColor?: string;
}

/**
 * State when the image has been successfully loaded.
 */
export interface IMGElementStateSuccess extends IMGElementStateBase {
  type: 'success';
  /**
   * Image-only style extracted from `IMGElement.style` prop.
   */
  imageStyle: ImageStyle;
  /**
   * This callback should be passed down to the underlying image component.
   *
   * @remarks Quite often, the image won't be pre-fetched
   * because its print dimensions can be determined immediately. For
   * example, when both width and height are provide as attributes. So the
   * first state s0 of this state machine can be "success", and the second
   * state s1 be "error".
   */
  onError: (error: Error) => void;
}

/**
 * State when the image is loading.
 */
export interface IMGElementStateLoading extends IMGElementStateBase {
  type: 'loading';
}

/**
 * State when the image could not be loaded.
 */
export interface IMGElementStateError extends IMGElementStateBase {
  type: 'error';
  error: Error;
}
