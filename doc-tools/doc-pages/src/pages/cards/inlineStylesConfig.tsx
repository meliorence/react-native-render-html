import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="color: purple; font-size: 2rem;">
  <span style="text-align: center; text-decoration-line: underline;">
    Hello world!
  </span>
</p>`;

const inlineStylesConfig: UIRenderHtmlCardProps = {
  title: 'Minimal Inline Styles Example',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default inlineStylesConfig;
