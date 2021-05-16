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
    'Usage of domVisitors.onText to resolve handlebar-style variable in text nodes data. Note that this example might cost render time on very big documents since it will apply to every text node. You might want to add conditional logic to target text nodes children of specific tags.',
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
