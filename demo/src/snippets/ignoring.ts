import { DOMElement, DOMNode } from '@native-html/transient-render-engine';
import { SnippetDeclaration } from '../../types';
import { RED } from './styles';

const html = `
<h2>Discarding tags with <code>ignoredTags</code></h2>
<p>The below tag (h3) is ignored with the <code>ignoredTags</code> prop:</p>
<h3>This shouldn't be rendered !</h3>
<p>↑ no title there ? great.</p>
<h2>Discarding inline styles with <code>ignoredStyles</code></h2>
<p>
  The next div has a red background. It should be ignored with the
  <code>ignoredStyles</code> prop.
</p>
<div
  style="background-color: ${RED}; height: 200px; width: 200px; border-width: 1px"
></div>
<h2>Discarding DOM nodes with <code>ignoreDOMNode</code></h2>
<p>
  You can also use a function to ignore nodes if you need to be even more
  specific.
</p>
<p>Let's ignore "a" tags nested inside "divs" identified with black borders:</p>
<p>
  <a href="http://google.com">This link</a> works since it's nested inside a
  paragraph.
</p>
<div style="padding: 10px; text-align: center; border-width: 1px">
  <a href="http://google.com">you're a noisy one, aren't you ?</a>Can you see
  link in this div ? It has been ignored !
</div>
`;

function ignoreDOMNode(node: DOMNode) {
  return (
    (node as DOMElement).tagName === 'a' &&
    ((node as DOMElement).parent as DOMElement).tagName === 'div'
  );
}

const ignoring: SnippetDeclaration = {
  name: 'Discarding Nodes & Styles',
  supportsLegacy: true,
  codeSource: '/demo/snippets/ignoring.ts',
  props: {
    source: { html },
    ignoredTags: ['h3'],
    ignoredStyles: ['backgroundColor', 'background-color'],
    baseStyle: { paddingBottom: 10 },
    containerStyle: { paddingBottom: 10 },
    ignoreDOMNode,
    ignoreNodesFunction: ignoreDOMNode
  } as any
};

export default ignoring;
