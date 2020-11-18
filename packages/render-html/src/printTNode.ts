import { TNode, TText } from '@native-html/transient-render-tree';

function tnodePropertiesString(tnode: TNode) {
  const tagPrint = tnode.tagName ? `tag=${tnode.tagName}` : 'anonymous';
  const idPrint = tnode.id ? `id=${tnode.id}` : null;
  const classesPrint = tnode.className ? `classes=${tnode.className}` : null;
  const dataPrint =
    tnode instanceof TText
      ? `data="${
          tnode.data.length > 20
            ? tnode.data.substring(0, 17) + '…'
            : tnode.data
        }"`
      : null;
  // @ts-ignore
  const anchorPrint = tnode.isAnchor ? `anchor[${tnode.href}]` : null;
  const detailsPrint = [tagPrint, idPrint, classesPrint, dataPrint, anchorPrint]
    .filter((p) => p !== null)
    .join(',');
  return `${tnode.constructor.name}(${detailsPrint})`;
}

function tnodeToString(
  tnode: TNode,
  paddingLeftParent = 0,
  isChild = false,
  isLast = false,
  hasParentLine = false
) {
  const paddingLeftChars = ''.padStart(1, '');
  const prefix = isChild ? (isLast ? '└' : '├') : '';
  const parentPrefix = !hasParentLine ? '' : '│';
  const paddingPrefixChars = parentPrefix.padStart(paddingLeftParent - 1, ' ');
  const childrenPrint: string = tnode.children
    .map(
      (c, i) =>
        tnodeToString(
          c,
          paddingLeftParent + 1,
          true,
          i === tnode.children.length - 1
        ),
      isChild && !isLast
    )
    .join('');
  return `${paddingPrefixChars}${paddingLeftChars}${prefix}${tnodePropertiesString(
    tnode
  )}\n${childrenPrint}`;
}

export default function printTNode(tnode: TNode) {
  console.info(tnodeToString(tnode));
}
