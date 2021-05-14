import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { isTag } from 'domutils';
import { DOMNode } from 'react-native-render-html';

const html = `
<div style="padding: 10px; text-align: center">
  <a href="">you're a noisy one, aren't you?</a>
  Can you see the anchor? It has been ignored!
</div>
`;

const ignoreDomNodeSrc = `function ignoreDomNode(node) {
  // remove anchors with empty "src"
  return isTag(node) && node.tagName === 'a' && !node.attribs.src;
}`;

function ignoreDomNode(node: DOMNode) {
  // remove anchors with empty "src"
  return isTag(node) && node.name === 'a' && !node.attribs.src;
}

const ignoreDomNodeConfig: UIRenderHtmlCardProps = {
  title: 'Removing DOM nodes conditionally',
  caption:
    'Usage of ignoreDomNode to remove anchors with empty "src" attribute.',
  props: {
    source: { html },
    ignoreDomNode
  },
  config: {
    importStatements: ["import { isTag } from 'domutils';"],
    fnSrcMap: {
      ignoreDomNode: ignoreDomNodeSrc
    }
  }
};

export default ignoreDomNodeConfig;
