import { SnippetDeclaration } from '../types';

const html =
  '<h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><h4>Header 4</h4><h5>Header 5</h5><h6>Header 6</h6>';

const headers: SnippetDeclaration = {
  name: 'Headers',
  supportsLegacy: true,
  codeSource: '/demo/snippets/headers.ts',
  props: {
    source: { html }
  }
};

export default headers;
