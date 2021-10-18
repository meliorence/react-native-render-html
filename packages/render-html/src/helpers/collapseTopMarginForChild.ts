import { TNode } from '@native-html/transient-render-engine';
import getCollapsedMarginTop from './getCollapsedMarginTop';

function isCollapsible(tnode: TNode) {
  return tnode.type === 'block' || tnode.type === 'phrasing';
}

/**
 * Compute top collapsed margin for the nth {@link TNode}-child of a list of
 * TNodes.
 *
 * @param n - The index for which the top margin should be collapsed.
 * @param tchildren - The list of {@link TNode} children.
 * @returns `null` when no margin collapsing should apply, a number otherwise.
 * @public
 */
export default function collapseTopMarginForChild(
  n: number,
  tchildren: readonly TNode[]
): number | null {
  const childTnode = tchildren[n];
  if (isCollapsible(childTnode) && n > 0 && isCollapsible(tchildren[n - 1])) {
    return getCollapsedMarginTop(tchildren[n - 1], childTnode);
  }
  return null;
}
