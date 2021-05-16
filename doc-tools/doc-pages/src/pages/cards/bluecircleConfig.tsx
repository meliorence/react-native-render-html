import { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = '<bluecircle></bluecircle>';

const bluecircleConfig: UIRenderHtmlCardProps = {
  title: 'A Custom Tag Example',
  caption:
    'A Custom Tag rendered by defining an element model for this tag via HTMLElementModel.fromCustomModel.',
  props: {
    source: { html },
    customHTMLElementModels: {
      bluecircle: HTMLElementModel.fromCustomModel({
        tagName: 'bluecircle',
        mixedUAStyles: {
          width: 50,
          height: 50,
          borderRadius: 25,
          alignSelf: 'center',
          backgroundColor: 'blue'
        },
        contentModel: HTMLContentModel.block
      })
    }
  },
  config: {
    importStatements: [
      "import { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';"
    ],
    exprSrcMap: {
      customHTMLElementModels: `{
    bluecircle: HTMLElementModel.fromCustomModel({
      tagName: 'bluecircle',
      mixedUAStyles: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'blue'
      },
      contentModel: HTMLContentModel.block
    })
  }`
    }
  }
};

export default bluecircleConfig;
