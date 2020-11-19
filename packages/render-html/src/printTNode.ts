import { TNode, tnodeToString } from '@native-html/transient-render-tree';

export default function printTNode(tnode: TNode) {
  console.info(tnodeToString(tnode));
}
