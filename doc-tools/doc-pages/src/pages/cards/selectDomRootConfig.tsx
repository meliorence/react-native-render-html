import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { findOne } from 'domutils';
import type { DOMNodeWithChildren } from 'react-native-render-html';

const html = `
<body>
  <nav>
    <a href="/">home</a>
    <a href="/contact">contact</a>
  </nav>
  <article style="padding: 10px;">
    <header>
      <h1>Lorem Impsum Dolor Sit!</h1>
    </header>
    <p>
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
  <footer>
    Lorem ipsum inc, ${new Date().getFullYear()}
  </footer>
</body>
`;

const selectDomRootSrc = `function selectDomRoot(node) {
  // Third argument set to 'true' for recursive search
  return findOne((e) => e.name === 'article', node.children, true);
}`;

function selectDomRoot(node: DOMNodeWithChildren) {
  return findOne((e) => e.name === 'article', node.children, true);
}

const selectDomRootConfig: UIRenderHtmlCardProps = {
  title: 'Selecting the Root to Render',
  caption:
    'Usage of selectDomRoot with findOne from domutils to select a subtree to render.',
  props: {
    source: { html },
    selectDomRoot
  },
  config: {
    importStatements: ["import { findOne } from 'domutils';"],
    fnSrcMap: {
      selectDomRoot: selectDomRootSrc
    }
  }
};

export default selectDomRootConfig;
