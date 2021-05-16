import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<div style="white-space: normal; text-align: center;">
<span>This is text!</span>

This is <strong>bold</strong>,  <em>italics</em>.
</div>`;

const whiteSpaceNormalConfig: UIRenderHtmlCardProps = {
  title: 'Whitespace Collapsing in Action',
  caption:
    'Notice that the four line breaks and the second space after the coma have been removed.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default whiteSpaceNormalConfig;
