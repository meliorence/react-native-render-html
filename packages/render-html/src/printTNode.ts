import { TNode, tnodeToString } from '@native-html/transient-render-engine';

export default function printTNode(tnode: TNode) {
  console.info(tnodeToString(tnode));
}
