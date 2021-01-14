import { SnippetDeclaration } from '../types';

// Change the HTML code here and see what happens.
const html = `
<ol style="">
  <li>Hello world</li>
</ol>
`;

const test: SnippetDeclaration = {
  name: 'Test!',
  supportsLegacy: true,
  codeSource: '/demo/snippets/test.tsx',
  // Pass any props to the RenderHTML component here. Take a look at other
  // snippet files, and especially customTags and customRenderers to learn the
  // new renderer API
  props: {
    source: { html }
  }
};

export default test;
