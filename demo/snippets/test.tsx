import { SnippetDeclaration } from '../types';

// Change the HTML code here and see what happens.
const html = `
Testing playground.
`;

const test: SnippetDeclaration = {
  name: 'Test!',
  html,
  // Pass any props to the RenderHTML component here. Take a look at other
  // snippet files, and especially customTags and customRenderers to learn the
  // new renderer API
  props: {}
};

export default test;
