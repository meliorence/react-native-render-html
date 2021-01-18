import { SnippetDeclaration } from '../types';
import { RED } from './styles';

const html = `
<p>The following tag (h2) is ignored with the "ignoredTags" prop</p>
<h2>This shouldn't be rendered !</h2>
<p>↑ no title there ? great.</p>
<p>
  The next div has a ${RED} background. It should be ignored with the
  "ignoredStyles" prop.
</p>
<div
  style="background-color: ${RED}; height: 200px; width: 200px; border-width: 1px"
></div>
`;

const ignoring: SnippetDeclaration = {
  name: 'Ignoring Tags & Styles',
  supportsLegacy: true,
  codeSource: '/demo/snippets/ignoring.ts',
  props: {
    source: { html },
    ignoredTags: ['h2'],
    ignoredStyles: ['backgroundColor']
  }
};

export default ignoring;
