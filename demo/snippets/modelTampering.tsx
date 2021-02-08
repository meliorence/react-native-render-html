import {
  extendDefaultRenderer,
  HTMLContentModel
} from 'react-native-render-html';
import { SnippetDeclaration } from '../types';

const html = `
<p>
In the below example, we are changing the element model of the &lt;img&gt; tag
to support inline rendering. For this purpose, we take advantage of the <code>extendDefaultRenderer</code> utility!
</p>
<p>
Be advised, this is yet <strong>experimental</strong>, and React Native has many open bugs regarding inline views and images.</p>
<hr/>
<p style="text-align:center">
  Those are inline images!<br/><br/>
  before
  <img src="https://www.fillmurray.com/50/50" width="50" height="50" />&nbsp;
  <img src="https://www.fillmurray.com/70/50" width="70" height="50" />
  after
</p>
`;

const modelTampering: SnippetDeclaration = {
  name: 'Model tampering',
  supportsLegacy: false,
  codeSource: '/demo/snippets/modelTampering.tsx',
  props: {
    source: { html },
    renderers: {
      img: extendDefaultRenderer('img', {
        contentModel: HTMLContentModel.mixed
      })
    }
  }
};

export default modelTampering;
