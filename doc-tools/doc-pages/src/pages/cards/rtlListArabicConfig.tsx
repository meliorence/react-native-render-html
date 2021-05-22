import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import arabicIndic from '@jsamr/counter-style/presets/arabicIndic';

const html = `<ol dir="rtl" style="list-style-type: arabic-indic;">
  <li>واحد</li>
  <li>اثنين</li>
  <li>ثلاثة</li>
  <li>أربعة</li>
  <li>خمسة</li>
  <li>ستة</li>
  <li>سبعة</li>
  <li>ثمانية</li>
</ol>`;

const rtlListArabicConfig: UIRenderHtmlCardProps = {
  title: 'RTL Mode with Arabic Counter Style',
  props: {
    source: {
      html
    },
    renderersProps: {
      ol: {
        enableExperimentalRtl: true
      }
    },
    customListStyleSpecs: {
      'arabic-indic': {
        type: 'textual',
        counterStyleRenderer: arabicIndic
      }
    }
  },
  config: {
    importStatements: [
      {
        package: '@jsamr/counter-style/presets/arabicIndic',
        default: 'arabicIndic'
      }
    ],
    exprSrcMap: {
      counterStyleRenderer: 'arabicIndic'
    }
  }
};

export default rtlListArabicConfig;
