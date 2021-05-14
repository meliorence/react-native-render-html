import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `
<p style="text-align: center;">
  Hi <strong>{{userName}}</strong>
  you have news today!
</p>
`;

const onTextSrc = `function onText(text) {
  text.data = text.data.replace(/\\{\\{userName\\}\\}/g, 'John Doe');
}`;

const replaceDataConfig: UIRenderHtmlCardProps = {
  title: 'Altering Text Data',
  caption:
    'A DOM Visitor to resolve handlebar-style variable in text nodes data.',
  props: {
    source: { html },
    domVisitors: {
      onText(text) {
        text.data = text.data.replace(/\{\{userName\}\}/g, 'John Doe');
      }
    }
  },
  config: {
    fnSrcMap: {
      onText: onTextSrc
    }
  }
};

export default replaceDataConfig;
