import { DOMElement } from '@native-html/transient-render-engine';
import { SnippetDeclaration } from '../types';
import { RED } from './styles';

const html = `
<p>
  <em>alterData</em> and <em>alterChildren</em> props are very useful to make
  some modifications on the structure of your HTML before it's actually rendered
  into react components.
</p>
<h2>Using alterData</h2>
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
  <em>alterData</em> is simple, you get the parsed <em>node</em> as the first
  parameter of your function, so you can make the data whatever you want and
  return it. Just bear in mind that if you don't want to change a node, you have
  to return a falsy value.
</p>
<h2>Using alterChildren</h2>
<p>Let's remove the first two elements of the next ordered list</p>
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ol>
<h2>Using alterNode</h2>
<p>
  alterNode lets you change the values parsed from your HTML before it's
  rendered. It's extremely powerful as a last resort to add some very specific
  styling or circumvent rendering problems
</p>
<p>Let's make the color of links inside a <em>div</em> ${RED} !</p>
<p><a href="http://google.fr">This is a lame link inside a paragraph.</a></p>
<div><a href="http://google.fr">This is a very cool link inside a div</a></div>
`;

const alteration: SnippetDeclaration = {
  name: 'Altering data, chlidren & nodes',
  html,
  source: '/demo/snippets/alteration.ts',
  props: {
    alterData: (node) => {
      let { parent, data } = node;
      if (parent && (parent as DOMElement).name === 'h1') {
        return data.toUpperCase();
      } else {
        return false;
      }
    },
    alterChildren: (node) => {
      const { children, name } = node;
      if (name === 'ol' && children && children.length) {
        return children.splice(0, 2);
      } else {
        return false;
      }
    },
    alterNode: (node) => {
      const { name, parent } = node;
      if (name === 'a' && parent && (parent as DOMElement).name === 'div') {
        node.attribs = { ...(node.attribs || {}), style: 'color:${RED};' };
        return node;
      }
    }
  }
};

export default alteration;
