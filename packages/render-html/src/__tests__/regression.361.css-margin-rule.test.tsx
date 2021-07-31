import { render } from '@testing-library/react-native';
import { expectTranslatedInlineCSSRuleTo } from './utils';

/**
 * https://github.com/meliorence/react-native-render-html/issues/361
 */
describe('HTML component', () => {
  it('should pass regression #361 regarding inline margin CSS rules', () => {
    expectTranslatedInlineCSSRuleTo({
      cssInlineRules: 'margin: none;',
      render,
      test: (style) => expect(style.margin).toBeUndefined()
    });
  });
});
