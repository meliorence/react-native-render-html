import type {
  UseIMGElementStateProps,
  IMGElementState,
  IMGElementStateBase,
  IMGElementStateError,
  IMGElementStateSuccess,
  IMGElementStateLoading
} from './img-types';
import extractImageStyleProps from './extractImageStyleProps';
import { ImageDimensions } from '../shared-types';

interface GetStateProps<C> extends Omit<IMGElementStateBase, 'dimensions'> {
  concreteDimensions: C;
  error: Error | null;
  initialDimensions: ImageDimensions;
  objectFit: UseIMGElementStateProps['objectFit'];
  onError?: (e: Error) => void;
}

export function getIMGState(
  props: GetStateProps<ImageDimensions>
): IMGElementStateError | IMGElementStateSuccess;
export function getIMGState(
  props: GetStateProps<null | ImageDimensions>
): IMGElementState;
export function getIMGState({
  error,
  alt,
  altColor,
  source,
  containerStyle,
  concreteDimensions,
  initialDimensions,
  objectFit,
  onError
}: GetStateProps<any>): IMGElementState {
  if (error) {
    return {
      type: 'error',
      alt,
      altColor,
      source,
      error,
      containerStyle,
      dimensions: concreteDimensions ?? initialDimensions
    };
  }
  if (concreteDimensions != null) {
    return {
      type: 'success',
      alt,
      altColor,
      source,
      onError,
      containerStyle,
      imageStyle: extractImageStyleProps(containerStyle, objectFit),
      dimensions: concreteDimensions
    } as IMGElementStateSuccess;
  }
  return {
    type: 'loading',
    alt,
    altColor,
    source,
    containerStyle,
    dimensions: initialDimensions
  } as IMGElementStateLoading;
}
