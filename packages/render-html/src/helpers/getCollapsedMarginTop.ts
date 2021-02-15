import { TNode } from '@native-html/transient-render-engine';

/**
 * Compute a TNode top margin to satisfy requirements expressed in CSS
 * standard regarding margin collapsing.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing
 * for a reference.
 *
 * @param precedent - The node above the one for which we need to compute top margin.
 * @param current - The node for which a margin top might collapse.
 */
export default function getCollapsedMarginTop(
  precedent: TNode,
  current: TNode
): null | number {
  const topMostMarginBottom =
    typeof precedent.styles.nativeBlockRet.marginBottom === 'number'
      ? precedent.styles.nativeBlockRet.marginBottom
      : null;
  const bottomMostMarginTop =
    typeof current.styles.nativeBlockRet.marginTop === 'number'
      ? current.styles.nativeBlockRet.marginTop
      : null;
  if (topMostMarginBottom == null || bottomMostMarginTop == null) {
    return null;
  }
  if (topMostMarginBottom < 0 && bottomMostMarginTop < 0) {
    return (
      Math.min(topMostMarginBottom, bottomMostMarginTop) - topMostMarginBottom
    );
  }
  if (topMostMarginBottom < 0 || bottomMostMarginTop < 0) {
    return topMostMarginBottom + bottomMostMarginTop - topMostMarginBottom;
  }
  if (topMostMarginBottom > bottomMostMarginTop) {
    return 0;
  }
  return bottomMostMarginTop - topMostMarginBottom;
}
