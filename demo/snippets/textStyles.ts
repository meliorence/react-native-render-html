import { SnippetDeclaration } from '../types';
import { RED, BLUE } from './styles';

const html = `<p>Styling texts is a challenging part of converting HTML into react-native components.</p>
<p>There are significant differences between the CSS standard and how styles are handled in React Native. Most notably, <em>&lt;Text&gt;</em> styles don't inherit from <em>&lt;View&gt;</em> styles. The reconciliation is handled by the Transient Render Engine.</p>
<p>Let's see how styles are applied to texts with this library.</p>
<hr/>
<div style="color:${RED};">This text is inside a div, without a text tag wrapping it. The <em>div</em> tag only has <em>color:${RED};</em> (red) as style.</div>
<p>In the example above, you may find, if you inspect the rendered components, that it's the <em>Text</em> component inside that actually receives the color attribute.</p>
<p>This is how the Transient Render Engine passes block styles to their children, and let <em>Text</em> children consume <em>Text</em> specific styles.</p>
<hr/>
<div style="color:${RED}">
    <p>This first paragraph doesn't have inline styles.</p>
    <p style="color:${BLUE};">This one has <em>color:${BLUE};</em> (blue).</p>
</div>
<p>Here, the <em>div</em> wrapper still has <em>color:${RED};</em> (red) as style.</div>.</p>
<p>The first inner paragraph doesn't have any style attribute, either from HTML or from the <em>tagsStyles</em> or <em>classesStyles</em> props.</p>
<p>The second one is set to be ${BLUE} (blue) from its <em>style</em> attribute.</p>`;

const textStyles: SnippetDeclaration = {
  name: 'Texts Styles',
  supportsLegacy: true,
  codeSource: '/demo/snippets/textStyles.ts',
  props: {
    source: { html },
    tagsStyles: {
      div: { borderWidth: 1, padding: 10, borderColor: 'gray' }
    }
  }
};

export default textStyles;
