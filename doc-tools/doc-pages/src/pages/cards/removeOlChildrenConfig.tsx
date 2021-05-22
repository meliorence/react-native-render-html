import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { removeElement, isTag } from 'domutils';
import { DOMElement } from 'react-native-render-html';

const html = `
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ol>
`;

function onElement(element: DOMElement) {
  // Remove the first two children of an ol tag.
  if (element.tagName === 'ol') {
    let i = 0;
    for (const child of element.children) {
      // Children might be text node or comments.
      // We don't want to count these.
      if (isTag(child) && i < 2) {
        removeElement(child);
        i++;
      }
    }
  }
}

const onElementSrc = `function onElement(element) {
  // Remove the first two children of an ol tag.
  if (element.tagName === 'ol') {
    let i = 0;
    for (const child of element.children) {
      // Children might be text node or comments.
      // We don't want to count these.
      if (isTag(child) && i < 2) {
        removeElement(child);
        i++;
      }
    }
  }
}`;

const removeOlChildrenConfig: UIRenderHtmlCardProps = {
  title: 'DOM Visitor to Remove First Two Children of an Ol tag',
  caption:
    'Usage of domVisitors.onElement to remove the first two children of ol tags thanks to "removeElement" from domutils. Note that "isTag" from domutils is used to check if the children is a DOM element.',
  props: {
    source: { html },
    domVisitors: {
      onElement
    }
  },
  config: {
    importStatements: [
      {
        package: 'domutils',
        named: ['removeElement', 'isTag']
      }
    ],
    fnSrcMap: {
      onElement: onElementSrc
    }
  }
};

export default removeOlChildrenConfig;
