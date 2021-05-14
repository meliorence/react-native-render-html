import {
  HTMLContentModel,
  defaultHTMLElementModels
} from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="text-align:center">
  Those are inline images!<br/><br/>
  <strong>before</strong>
  <img src="https://www.fillmurray.com/50/50" width="50" height="50" />&nbsp;
  <img src="https://www.fillmurray.com/70/50" width="70" height="50" />&nbsp;
  <strong>after</strong>
</p>`;

const inlineImagesConfig: UIRenderHtmlCardProps = {
  title: 'A Children Tampering example',
  props: {
    source: { html },
    customHTMLElementModels: {
      img: defaultHTMLElementModels.img.extend({
        contentModel: HTMLContentModel.mixed
      })
    }
  },
  config: {
    importStatements: [
      `import {
  HTMLContentModel,
  defaultHTMLElementModels
} from 'react-native-render-html';`
    ],
    exprSrcMap: {
      customHTMLElementModels: `{
    img: defaultHTMLElementModels.img.extend({
      contentModel: HTMLContentModel.mixed
    })
  }`
    }
  }
};

export default inlineImagesConfig;
