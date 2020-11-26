import { SnippetDeclaration } from '../types';
import { RED } from './styles';

const html = `
<p>
  In the below example, the anchor encompasses both raw text and an img tag.
  You can click the image and you'll be directed to a WebView.
</p>
<a href="https://developer.mozilla.org/">A link to MDN!</a>
<a href="https://developer.mozilla.org/">
	<img alt="And this image too!" src="https://i.imgur.com/gSmWCJF.jpg" />
</a>
<hr />
<p>
  In the below example, the anchor surrounds a div with fixed width and height,
  which has a text node as a child. The child should overflow below the red-painted div.
</p>
<a href="http://google.fr"><div
style="
  background-color: ${RED};
  height: 20px;
  width: 40px;
"
>Click me!</div></a>
`;

const anchors: SnippetDeclaration = {
  name: 'Anchors',
  source: '/demo/snippets/anchors.ts',
  html
};

export default anchors;
