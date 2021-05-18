import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<div style="text-align: center;">
 This text is centered!
</div>`;

const cssInheritanceConfig: UIRenderHtmlCardProps = {
  title: 'CSS Inheritance Example',
  caption: '',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default cssInheritanceConfig;
