import { TNode } from '@native-html/transient-render-engine';
import { NativeStyleProp } from '../shared-types';

export default function mergeCollapsedMargins<T extends TNode>(
  collapsedMarginTop: number | null,
  nativeStyle: NativeStyleProp<T>
): NativeStyleProp<T> {
  if (typeof collapsedMarginTop !== 'number') {
    return nativeStyle;
  }
  return {
    ...nativeStyle,
    marginTop: collapsedMarginTop
  };
}
