import { render } from '@testing-library/react-native';
import { expectTranslatedInlineCSSValueToEqual } from './utils';

function testTranslation(cssValue: string, rnValue: any) {
  it(`sould translate ${cssValue} value to ${rnValue}`, () => {
    expectTranslatedInlineCSSValueToEqual({
      cssInlineRules: `text-align: ${cssValue};`,
      render,
      reactNativePropStyleName: 'textAlign',
      value: rnValue
    });
  });
}

/**
 * https://github.com/meliorence/react-native-render-html/issues/252
 */
describe('HTML component', () => {
  describe('should pass regression #252 regarding inline text-align CSS rules', () => {
    testTranslation('left', 'left');
    testTranslation('right', 'right');
    testTranslation('auto', 'auto');
    testTranslation('justify', 'justify');
    testTranslation('center', 'center');
    testTranslation('start', undefined);
    testTranslation('end', undefined);
    testTranslation('justify-all', undefined);
  });
});
