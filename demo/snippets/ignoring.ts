import { DOMElement } from '@native-html/transient-render-engine';
import { SnippetDeclaration } from '../types';
import { RED } from './styles';

const html = `
<p>The following tag (h2) is ignored with the "ignoredTags" prop</p>
<h2>This shouldn't be rendered !</h2>
<p>^^^ no title there ? great.</p>
<p>
  The next div has a ${RED} background. It should be ignored with the
  "ignoredStyles" prop.
</p>
<div
  style="background-color: ${RED}; height: 200px; width: 200px; border-width: 1px"
></div>
<p>
  You can also use a function to ignore nodes if you need to be even more
  specific.
</p>
<p>Let's ignore "a" tags nested inside "divs"</p>
<p>
  <a href="http://google.com">This link</a> works since it's nested inside a
  paragraph.
</p>
<div style="padding: 10px; color: white; text-align: center; border-width: 1px">
  <a href="http://google.com">you're a noisy one, aren't you ?</a>Can you see
  link in this div ? It has been ignored !
</div>

`;

const ignoring: SnippetDeclaration = {
  name: 'Ignoring Tags & Styles',
  supportsLegacy: true,
  codeSource: '/demo/snippets/ignoring.ts',
  props: {
    source: { html },
    ignoredTags: ['h2'],
    ignoredStyles: ['backgroundColor'],
    ignoreNode: (node) => {
      return (
        !!node.parent &&
        (node.parent as DOMElement).name === 'a' &&
        !!node.parent.parent &&
        (node.parent.parent as DOMElement).name === 'div'
      );
    }
  }
};

export default ignoring;
