import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { isTag } from 'domutils';
import type { Node, NodeWithChildren } from 'react-native-render-html';

const html = `
<p style="text-align: center">
  <a href="">you're a noisy one, aren't you?</a>
  Can you see the anchor? It has been ignored!
</p>
`;

const ignoreDomNodeSrc = `function ignoreDomNode(node, parent) {
  // remove anchors children of <p> elements
  return (
    isTag(node) && node.name === 'a' && parent.name === 'p'
  );
}`;

function ignoreDomNode(node: Node, parent: NodeWithChildren) {
  // remove anchors children of <p> elements
  return (
    isTag(node) && node.name === 'a' && isTag(parent) && parent.name === 'p'
  );
}

const ignoreDomNodeConfig: UIRenderHtmlCardProps = {
  title: 'Removing DOM nodes conditionally',
  caption:
    "Usage of ignoreDomNode to remove anchors children of <p> elements. Notice that the second argument to ignoreDomNode function is used to perform assertions on the parent. Don't use node.parent since the node hasn't been attached yet.",
  props: {
    source: { html },
    ignoreDomNode
  },
  config: {
    importStatements: [
      {
        package: 'domutils',
        named: ['isTag']
      }
    ],
    fnSrcMap: {
      ignoreDomNode: ignoreDomNodeSrc
    }
  }
};

export default ignoreDomNodeConfig;
