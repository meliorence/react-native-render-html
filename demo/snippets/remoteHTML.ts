import { SnippetDeclaration } from '../types';

const remoteHTML: SnippetDeclaration = {
  name: 'Remote HTML',
  supportsLegacy: true,
  codeSource: '/demo/snippets/remoteHTML.ts',
  props: {
    source: { uri: 'http://motherfuckingwebsite.com' }
  }
};

export default remoteHTML;
