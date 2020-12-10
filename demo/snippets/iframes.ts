import { SnippetDeclaration } from '../types';

const html = `
<p>Yes you read that right, those damn iframes can render with this plugin.</p>
<p>Check this out</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZZ5LpwO-An4" frameborder="0" allowfullscreen></iframe>
</iframe>
<p style="text-align:center;"><em>We've just rendered a meme</em></p>
`;

const iframes: SnippetDeclaration = {
  name: 'Iframes',
  supportsLegacy: true,
  codeSource: '/demo/snippets/iframes.ts',
  props: {
    source: { html }
  }
};

export default iframes;
