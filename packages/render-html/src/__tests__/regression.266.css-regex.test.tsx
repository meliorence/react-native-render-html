import { render } from '@testing-library/react-native';
import { expectTranslatedInlineCSSValueToEqual } from './utils';

function testFontWithSpecialPattern(fontName: string) {
  it(`preserve special font name matching keywords such as ${fontName}`, () => {
    expectTranslatedInlineCSSValueToEqual({
      render,
      cssInlineRules: `font-family: ${fontName}`,
      reactNativePropStyleName: 'fontFamily',
      value: fontName,
      extraProps: {
        systemFonts: [fontName]
      }
    });
  });
}

/**
 * https://github.com/meliorence/react-native-render-html/issues/266
 */
describe('HTML component', () => {
  describe('should pass regression #266 regarding mangeling of specific value patterns', () => {
    testFontWithSpecialPattern('fontWith-em');
    testFontWithSpecialPattern('fontWith-pt');
    testFontWithSpecialPattern('fontWith-px');
    testFontWithSpecialPattern('fontWith-normal');
    testFontWithSpecialPattern('fontWith-inherit');
    testFontWithSpecialPattern('fontWith-calc');
    testFontWithSpecialPattern('fontWith-none');
    testFontWithSpecialPattern('NovelSansPro-SemiBold');
  });
});
