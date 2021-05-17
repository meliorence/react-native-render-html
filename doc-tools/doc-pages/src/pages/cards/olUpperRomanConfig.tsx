import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<ol style="list-style-type: upper-roman; color: blue; font-weight: bold;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ol>`;

const olUpperRomanConfig: UIRenderHtmlCardProps = {
  title: 'Upper Roman List Style Type',
  caption:
    'Notice how marker pseudo-elements will inherit from the styles of the <ol> tag.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default olUpperRomanConfig;
