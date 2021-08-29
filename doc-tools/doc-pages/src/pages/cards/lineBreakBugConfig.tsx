import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="background-color: yellow">
  A line with a line break closing
  an inline formatting context.<br>
</p>
`;

const lineBreakBugConfig: UIRenderHtmlCardProps = {
  title: 'Line break bug in v6',
  caption:
    'A line break closing an inline formatting context should not be printed according to WHATWG HTML standard. Notice that there is an extraneous new line at the end of the sentence.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default lineBreakBugConfig;
