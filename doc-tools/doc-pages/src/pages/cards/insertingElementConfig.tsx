import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { prependChild } from 'domutils';
import { Element } from 'domhandler';
import { DOMElement } from 'react-native-render-html';

const html = `
<article data-cover-src="https://picsum.photos/640/360">
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
  // Add an image extracted from data-cover-src
  // attr as first child of every article.
  if (element.tagName === 'article') {
    const cover = element.attribs['data-cover-src'];
    if (cover) {
      const img = new Element('img', {
        src: cover
      });
      prependChild(element, img);
    }
  }
}

const onElementSrc = `function onElement(element) {
  // Add an image extracted from data-cover-src
  // attr as first child of every article.
  if (element.tagName === 'article') {
    const cover = element.attribs['data-cover-src'];
    if (cover) {
      const img = new Element('img', {
        src: cover
      });
      prependChild(element, img);
    }
  }
}`;

const insertingElementConfig: UIRenderHtmlCardProps = {
  title: 'DOM Visitor to Insert Content',
  caption:
    'Usage of domVisitors.onElement to insert an <img> element at the top of every article thanks to "prependChild" function from domutils. The source is extracted from the "data-cover-src" attribute of the article element.',
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
