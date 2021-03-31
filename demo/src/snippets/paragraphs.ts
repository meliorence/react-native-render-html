import { SnippetDeclaration } from '../../types';
import { HIGHLIGHT } from './styles';

const html = `
<p>Paragraphs have a default margin top and bottom of 16px. If you use 
	<em>enableExperimentalMarginCollapsing</em>, margins of adjacents blocks will collapse 
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing">as per the CSS standard</a> (this is the case in the demo when Foundry is enabled).
</p>
<hr />
<p style="font-size: 1.3em">
This paragraph is styled with a font size set in em!
</p>
<hr/>
<p style="padding: 10%; background-color: #f7a29c">
This one features a padding
<strong>in percentage !</strong>
</p>
<hr />
<p>
<i>Here, we have a style set on the "i" tag with the
"tagsStyles" prop.</i>
</p>
<hr />
<p>
And

<a href="http://google.fr" title="Google FR"><p>
This is a link surrounding a paragraph!
</p></a>
</p>
<hr />
<p class="last-paragraph">
Finally, this paragraph is styled through the
classesStyles prop
</p>`;

const paragraphs: SnippetDeclaration = {
  name: 'Paragraphs',
  supportsLegacy: true,
  codeSource: '/demo/snippets/paragraphs.ts',
  props: {
    source: { html },
    baseStyle: {},
    tagsStyles: {
      i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' }
    },
    classesStyles: {
      'last-paragraph': {
        textAlign: 'right',
        marginLeft: 20,
        color: 'teal',
        fontWeight: 'bold',
        backgroundColor: HIGHLIGHT
      }
    }
  }
};

export default paragraphs;
