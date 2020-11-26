import {
  defaultHTMLElementModels,
  defaultRenderers,
  extendRenderer,
  HTMLContentModel
} from 'react-native-render-html';
import { SnippetDeclaration } from '../types';

const html = `
<p>
In the below example, we are changing the element model of the &lt;img&gt; tag
to support inline rendering. For this purpose, we take advantage of the <code>extendRenderer</code> utility!
</p>
<p>
Be advised, this is yet <strong>experimental</strong>, and React Native has many open bugs regarding inline views and images.</p>
<hr/>
<p style="text-align:center">
  Those are inline images!<br/><br/>
  before
  <img src="https://fomoyolo-dev-assets.s3.amazonaws.com/image-gallery/c4ea7600-9acb-11ea-a7d0-9bf50f73b3c4.jpg" style="height:32px; width:32px" />&nbsp;
  <img src="https://fomoyolo-dev-assets.s3.amazonaws.com/image-gallery/5358e030-9ad0-11ea-a7d0-9bf50f73b3c4.jpg" style="height:32px; width:32px" />&nbsp;
  <img alt="" src="https://fomoyolo-dev-assets.s3.amazonaws.com/image-gallery/99439680-9ad0-11ea-a7d0-9bf50f73b3c4.jpg" style="height:32px; width:57px" />
  after
</p>
`;

const modelTampering: SnippetDeclaration = {
  name: 'Model tampering',
  html,
  source: '/demo/snippets/modelTampering.tsx',
  props: {
    renderers: {
      img: extendRenderer(
        defaultRenderers.img,
        defaultHTMLElementModels.img.extend({
          contentModel: HTMLContentModel.mixed
        })
      )
    }
  }
};

export default modelTampering;
