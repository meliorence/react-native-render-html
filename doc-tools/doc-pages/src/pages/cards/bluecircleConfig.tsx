import { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = '<blue-circle></blue-circle>';

const bluecircleConfig: UIRenderHtmlCardProps = {
  title: 'A Custom Tag Example',
  caption:
    'A Custom Tag rendered by defining an element model for this tag via HTMLElementModel.fromCustomModel.',
  props: {
    source: { html },
    customHTMLElementModels: {
      'blue-circle': HTMLElementModel.fromCustomModel({
        tagName: 'blue-circle',
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
      {
        package: 'react-native-render-html',
        named: ['HTMLElementModel', 'HTMLContentModel']
      }
    ],
    exprSrcMap: {
      customHTMLElementModels: `{
    'blue-circle': HTMLElementModel.fromCustomModel({
      tagName: 'blue-circle',
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
