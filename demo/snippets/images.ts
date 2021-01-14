import { SnippetDeclaration } from '../types';

const html = `
<p>
  Similarly to browsers, this library will place a print box before fetching image dimensions when both <em>width</em> and <em>height</em> attributes are provided.
  This is great to avoid images "jumping" from zero height to their computed height, and is a hint to good web design.
</p>
<p>
  Moreover, this library will automatically scale images down to the available width, even when the provided inline style width is greater than the container width.
  You are strongly advised to provide a <em>contentWidth</em> property from <em>useWindowsDimensions</em> official hook to help this component handle the scaling.
</p>
<hr/>
<p>This image display dimensions are set with inline styles (<em>width: 50%; height: 100px;</em>)</p>
<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>
<hr />
<p>
  The next image will be sized automatically thanks to the <em>contentWidth</em> and
  <em>computeEmbeddedMaxWidth</em> props. The latter allows you to set the maximum width from <em>contentWidth</em>,
  or disabling scaling by returning <code>Infinity</code>.
</p>
<img width="1200" height="800" src="https://i.imgur.com/XP2BE7q.jpg" />
<hr />
<p>
  Here are images inside paragraphs!.
</p>
<p>
	<img width="1200" height="800" src="https://i.imgur.com/gSmWCJF.jpg" />
</p>
<p>
  Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato
  repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam
  versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens
  iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam
  quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset
  usquam locum vi subita perrupturus.
</p>
<p>
	<img width="1200" height="800" src="https://i.imgur.com/XP2BE7q.jpg" />
</p>
<hr />
<p>The following image has an unreachable <em>src</em>.</p>
<img src="http://example.tld/image.jpg" />
<hr />
<p>Same, with <em>alt="The Void"</em>.</p>
<img alt="The Void" src="http://example.tld/image.jpg" />
<hr />
<p>Same, with <em>width="300" height="200"</em>. It should preserve its width and height!</p>
<img width="300" height="200" alt="The Void" src="http://example.tld/image.jpg" />
</p>
`;

const images: SnippetDeclaration = {
  name: 'Images',
  supportsLegacy: true,
  codeSource: '/demo/snippets/images.ts',
  props: {
    source: { html },
    baseStyle: {}
  }
};

export default images;
