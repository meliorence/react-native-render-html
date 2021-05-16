import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<a
  href="https://developer.mozilla.org/"
  style="text-align:center;">
    A link to MDN!
</a>`;

const anchorsMinimalConfig: UIRenderHtmlCardProps = {
  title: 'Minimal Anchor Example',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default anchorsMinimalConfig;
