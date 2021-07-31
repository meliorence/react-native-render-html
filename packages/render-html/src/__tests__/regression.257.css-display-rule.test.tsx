import { render } from '@testing-library/react-native';
import { expectTranslatedInlineCSSToMatchObject } from './utils';

/**
 * https://github.com/meliorence/react-native-render-html/issues/257
 */
describe('HTML component', () => {
  it('should pass regression #257 regarding inline display CSS rules', () => {
    expectTranslatedInlineCSSToMatchObject({
      cssInlineRules: 'display: inline-block;',
      render,
      reactNativeStyle: {}
    });
  });
});
