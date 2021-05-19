import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import thaiCounterStyle from '@jsamr/counter-style/presets/thai';

const html = `<ul style="list-style-type: thai;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ul>`;

const customListThaiConfig: UIRenderHtmlCardProps = {
  title: 'Thai List Style Type',
  props: {
    source: {
      html
    },
    customListStyleSpecs: {
      thai: {
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

export default customListThaiConfig;
