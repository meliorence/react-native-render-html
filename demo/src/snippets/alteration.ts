import { DOMElement, DOMText } from '@native-html/transient-render-engine';
import { SnippetDeclaration } from '../../types';
import { RED } from './styles';

const html = `
<p>
  <code>alterDOMData</code> and <code>alterDOMChildren</code> props are very useful to make
  some modifications on the structure of your HTML before it's actually rendered
  into react components.
</p>
<h2>Using <code>alterDOMData</code></h2>
<p>
  For instance, you can alter the content of <em>h1, h2, h3...</em> titles to
  make them uppercase or remove the last child of a list.
</p>
<p>
  The next title is written in lowercase in the HTML snippet, but it will be
  displayed in uppercase.
</p>
<h1>title</h1>
<p>
  <code>alterDOMData</code> is simple: you get the DOM <em>node</em> as the first
  parameter of your function, so you can make the data whatever you want and
  return it. Just bear in mind that if you don't want to change a node, you have
  to return a falsy value or void.
</p>
<h2>Using <code>alterDOMChildren</code></h2>
<p>Let's remove the first two elements of the next ordered list:</p>
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ol>
<h2>Using <code>alterDOMElement</code></h2>
<p>
  <code>alterDOMElement</code> lets you change the values parsed from your HTML before it's
  rendered. It's extremely powerful as a last resort to add some very specific
  styling or circumvent rendering problems
</p>
<p>Let's make the color of links inside a <em>div</em> red!</p>
<p><a href="http://google.fr">This is a lame link inside a paragraph.</a></p>
<div><a href="http://google.fr">This is a very cool link inside a div</a></div>
`;

function alterDOMChildren(node: DOMElement) {
  const { children, name } = node;
  if (name === 'ol' && children?.length) {
    const filteredChildren = children.filter((c) => c.type === 'tag');
    filteredChildren.splice(0, 2);
    return filteredChildren;
  }
}

function alterDOMData(node: DOMText) {
  let { parent, data } = node;
  if (parent && (parent as DOMElement).name === 'h1') {
    return data.toUpperCase();
  }
}

function alterDOMElement(node: DOMElement) {
  const { name, parent } = node;
  if (name === 'a' && parent && (parent as DOMElement).name === 'div') {
    node.attribs = { ...(node.attribs || {}), style: `color:${RED};` };
    return node;
  }
}

const alteration: SnippetDeclaration = {
  name: 'Altering data, chlidren & nodes',
  supportsLegacy: true,
  codeSource: '/demo/snippets/alteration.ts',
  props: {
    source: { html },
    alterDOMData,
    alterDOMChildren,
    alterDOMElement,
    alterData: alterDOMData,
    alterChildren: alterDOMChildren,
    alterNode: alterDOMElement
  } as any
};

export default alteration;
