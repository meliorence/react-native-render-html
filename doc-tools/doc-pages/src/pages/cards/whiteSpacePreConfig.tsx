import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<div style="white-space: pre; text-align: center;">
<span>This is text!</span>

This is <strong>bold</strong>, <em>italics</em>.
</div>`;

const whiteSpacePreConfig: UIRenderHtmlCardProps = {
  title: 'Whitespace Collapsing Disabled',
  caption:
    'Notice that the four line breaks and the second space after the coma have been preserved.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default whiteSpacePreConfig;
