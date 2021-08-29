import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="background-color: yellow">
  <span></span>
  <span></span>
</p>
`;

const ghostLineFixConfig: UIRenderHtmlCardProps = {
  title: 'Ghost lines fix',
  caption:
    'enableExperimentalGhostLinePrevention prop will attempt to prevent this odd behavior, including with multiple empty tags and whitespaces.',
  props: {
    source: {
      html
    },
    enableExperimentalGhostLinesPrevention: true
  },
  preferHtmlSrc: true
};

export default ghostLineFixConfig;
