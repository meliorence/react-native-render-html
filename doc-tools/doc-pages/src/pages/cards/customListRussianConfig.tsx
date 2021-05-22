import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import CounterStyle from '@jsamr/counter-style';

const lowerRussian = CounterStyle.alphabeticFromUnicodeRange(
  0x430, // а
  28
).withSuffix(') ');

const html = `<ul style="list-style-type: lower-russian;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ul>`;

const customListRussianConfig: UIRenderHtmlCardProps = {
  title: 'Creating a List Style Type',
  props: {
    source: {
      html
    },
    customListStyleSpecs: {
      'lower-russian': {
        type: 'textual',
        counterStyleRenderer: lowerRussian
      }
    }
  },
  config: {
    importStatements: [
      { package: '@jsamr/counter-style', default: 'CounterStyle' }
    ],
    exprSrcMap: {
      counterStyleRenderer: `CounterStyle.alphabeticFromUnicodeRange(
      0x430, // а
      28     // number of chars in alphabet
    ).withSuffix(') ')`
    }
  }
};

export default customListRussianConfig;
