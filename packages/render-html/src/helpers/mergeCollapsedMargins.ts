import { TNodeShape, TNodeType } from '@native-html/transient-render-engine';

export default function mergeCollapsedMargins<T extends TNodeType>(
  collapsedMarginTop: number | null | undefined,
  nativeStyle: ReturnType<TNodeShape<T>['getNativeStyles']>
): ReturnType<TNodeShape<T>['getNativeStyles']> {
  if (typeof collapsedMarginTop !== 'number') {
    return nativeStyle;
  }
  return {
    ...nativeStyle,
    marginTop: collapsedMarginTop
  };
}
