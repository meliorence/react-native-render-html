import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<ul style="list-style-type: disc;">
  <li>واحد</li>
  <li>اثنين</li>
  <li>ثلاثة</li>
  <li>أربعة</li>
  <li>خمسة</li>
  <li>ستة</li>
  <li>سبعة</li>
  <li>ثمانية</li>
</ul>`;

const rtlListDiscConfig: UIRenderHtmlCardProps = {
  title: 'RTL Mode with Arabic Counter Style',
  props: {
    source: {
      html
    },
    renderersProps: {
      ul: {
        enableExperimentalRtl: true
      }
    }
  }
};

export default rtlListDiscConfig;
