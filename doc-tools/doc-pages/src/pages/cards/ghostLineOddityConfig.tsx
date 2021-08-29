import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="background-color: yellow">
  <span></span>
</p>
`;

const ghostLineOddityConfig: UIRenderHtmlCardProps = {
  title: 'Ghost lines in React Native',
  caption:
    'The span element is rendered as an empty Text, but it takes vertical space, approximately 20dpi, independent of font size and line height.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default ghostLineOddityConfig;
