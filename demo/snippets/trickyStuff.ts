import { SnippetDeclaration } from '../types';

const html = `
<p>This example showcases tricky stuff like empty paragraphs, nested tags...</p>
<p>Next paragraph is empty</p>
<p></p>
<p>Next paragraph has an image nested in 3 p tags</p>
<p>
    <p>
        <p><img src="https://i.imgur.com/gSmWCJF.jpgg" /></p>
    </p>
</p>
`;

const trickyStuff: SnippetDeclaration = {
  name: 'Tricky stuff',
  supportsLegacy: true,
  codeSource: '/demo/snippets/trickyStuff.ts',
  props: {
    source: { html }
  }
};

export default trickyStuff;
