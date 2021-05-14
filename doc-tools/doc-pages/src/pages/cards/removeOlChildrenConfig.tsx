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
  caption: 'A DOM Visitor to Remove First Two Children of an Ol tag.',
  props: {
    source: { html },
    domVisitors: {
      onElement
    }
  },
  config: {
    importStatements: ["import { removeElement, isTag } from 'domutils';"],
    fnSrcMap: {
      onElement: onElementSrc
    }
  }
};

export default removeOlChildrenConfig;
