import { SnippetDeclaration } from '../types';

// Change the HTML code here and see what happens.
const html = `
<p>
  Open <code>demo/snippets/test.tsx</code> and edit me!
</p>
`;

const test: SnippetDeclaration = {
  name: 'Test!',
  source: '/demo/snippets/test.tsx',
  html,
  // Pass any props to the RenderHTML component here. Take a look at other
  // snippet files, and especially customTags and customRenderers to learn the
  // new renderer API
  props: {}
};

export default test;
