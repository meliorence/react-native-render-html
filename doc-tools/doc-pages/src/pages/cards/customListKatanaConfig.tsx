import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import thaiCounterStyle from '@jsamr/counter-style/presets/thai';

const html = `<ul style="list-style-type: katana;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ul>`;

const customListKatanaConfig: UIRenderHtmlCardProps = {
  title: 'Katana List Style Type',
  props: {
    source: {
      html
    },
    customListStyleSpecs: {
      katana: {
        type: 'textual',
        counterStyleRenderer: thaiCounterStyle
      }
    }
  },
  config: {
    importStatements: [
      "import thaiCounterStyle from '@jsamr/counter-style/presets/thai';"
    ],
    exprSrcMap: {
      counterStyleRenderer: 'thaiCounterStyle'
    }
  }
};

export default customListKatanaConfig;
