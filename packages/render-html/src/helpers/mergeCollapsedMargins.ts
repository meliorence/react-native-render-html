import { NativeStyleProp } from '../shared-types';

export default function mergeCollapsedMargins(
  collapsedMarginTop: number | null,
  nativeStyle: NativeStyleProp<any>
): NativeStyleProp<any> {
  if (typeof collapsedMarginTop !== 'number') {
    return nativeStyle;
  }
  return {
    ...nativeStyle,
    marginTop: collapsedMarginTop
  };
}
