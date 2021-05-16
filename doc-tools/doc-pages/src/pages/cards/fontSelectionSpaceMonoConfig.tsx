import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="font-family: 'space-mono'; padding: 10px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat. 
</p>`;

const fontSelectionSpaceMonoConfig: UIRenderHtmlCardProps = {
  title: 'Space Mono Font Selection',
  caption:
    'This paragraph font family is set to "Space Mono", which has been loaded in this project and set with systemFonts prop.',
  props: {
    source: {
      html
    },
    enableExperimentalMarginCollapsing: true
  },
  preferHtmlSrc: true
};

export default fontSelectionSpaceMonoConfig;
