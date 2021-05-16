import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<a href="https://developer.mozilla.org/">
  This text can be clicked.
  <img src="http://placeimg.com/1200/800/nature" />
  An the image too!
</a>`;

const anchorsBlockConfig: UIRenderHtmlCardProps = {
  title: 'Block Anchor Example',
  caption: '',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default anchorsBlockConfig;
