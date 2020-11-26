import { SnippetDeclaration } from '../types';
import { HIGHLIGHT } from './styles';

const html = `<p>In the below example, <em>white-space</em> is set to <em>normal</em> (the default)</p>
<div class="white-space-normal">
  <span>This is text!</span>

  This is <strong>bold</strong> <em>italics</em>.
</div>
<hr/>
<p>In this example, <em>white-space</em> is set to <em>pre</em> (the content is identical)</p>
<div class="white-space-pre">
  <span>This is text!</span>

  This is <strong>bold</strong> <em>italics</em>.
</div>
`;

const whitespace: SnippetDeclaration = {
  name: 'White Space Collapsing',
  source: '/demo/snippets/whitespace.ts',
  html,
  props: {
    tagsStyles: {
      div: {
        backgroundColor: HIGHLIGHT,
        color: 'black'
      }
    },
    classesStyles: {
      'white-space-pre': {
        whiteSpace: 'pre'
      },
      'white-space-normal': {
        whiteSpace: 'normal'
      }
    }
  }
};

export default whitespace;
