import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<ul style="list-style-type: square;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ul>`;

const ulSquareConfig: UIRenderHtmlCardProps = {
  title: 'Square List Style Type',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default ulSquareConfig;
