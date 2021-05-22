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
  title: 'Customizing Content Model',
  caption:
    'A usage of customHTMLElementModels prop to change the content model of <img> tags thanks to "extend" method of HTMLElementModel.',
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
      {
        package: 'react-native-render-html',
        named: ['HTMLContentModel', 'defaultHTMLElementModels']
      }
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
