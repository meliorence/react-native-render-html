import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="background-color: yellow">
  A line with a line break closing
  an inline formatting context.<br>
</p>
`;

const lineBreakFixConfig: UIRenderHtmlCardProps = {
  title: 'A fix to the line break bug',
  caption:
    'enableExperimentalBRCollapsing prop prevents this bug from happening',
  props: {
    source: {
      html
    },
    enableExperimentalBRCollapsing: true
  },
  preferHtmlSrc: true
};

export default lineBreakFixConfig;
