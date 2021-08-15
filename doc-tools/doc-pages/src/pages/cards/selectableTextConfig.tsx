import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<span>
  This text can be selected.
</span>`;

const selectableTextConfig: UIRenderHtmlCardProps = {
  title: 'Selectable text example',
  caption: '',
  props: {
    source: {
      html
    },
    defaultTextProps: {
      selectable: true
    }
  },
  preferHtmlSrc: false
};

export default selectableTextConfig;
