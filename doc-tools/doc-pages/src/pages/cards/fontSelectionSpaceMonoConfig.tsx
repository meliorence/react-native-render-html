import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { defaultSystemFonts } from 'react-native-render-html';

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
    'This paragraph font family is set to "Space Mono", which is loaded in this project and registered via systemFonts prop.',
  props: {
    source: {
      html
    },
    enableExperimentalMarginCollapsing: true,
    systemFonts: ["'space-mono'", ...defaultSystemFonts]
  },
  config: {
    importStatements: [
      "import { defaultSystemFonts } from 'react-native-render-html';"
    ],
    exprSrcMap: {
      systemFonts: '["\'space-mono\'", ...defaultSystemFonts]'
    }
  },
  preferHtmlSrc: false
};

export default fontSelectionSpaceMonoConfig;
