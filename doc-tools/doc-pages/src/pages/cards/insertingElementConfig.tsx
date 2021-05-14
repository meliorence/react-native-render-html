import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { prependChild } from 'domutils';
import { Element } from 'domhandler';
import { DOMElement } from 'react-native-render-html';

const html = `
<article>
  <p style="padding: 10px;">
    Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.
  </p>
</article>
`;

function onElement(element: DOMElement) {
  // Add an image as first child of every article.
  if (element.tagName === 'article') {
    const img = new Element('img', {
      src: 'https://picsum.photos/640/360',
      alt: 'A random picture'
    });
    prependChild(element, img);
  }
}

const onElementSrc = `function onElement(element) {
  // Add an image as first child of every article.
  if (element.tagName === 'article') {
    const img = new Element('img', {
      src: 'https://picsum.photos/640/360',
      alt: 'A random picture'
    });
    prependChild(element, img);
  }
}`;

const insertingElementConfig: UIRenderHtmlCardProps = {
  title: 'DOM Visitor to Insert Content',
  caption:
    'A DOM Visitor which inserts an img element at the top of every article.',
  props: {
    source: { html },
    domVisitors: {
      onElement
    }
  },
  config: {
    importStatements: [
      "import { prependChild } from 'domutils';",
      "import { Element } from 'domhandler';"
    ],
    fnSrcMap: {
      onElement: onElementSrc
    }
  }
};

export default insertingElementConfig;
