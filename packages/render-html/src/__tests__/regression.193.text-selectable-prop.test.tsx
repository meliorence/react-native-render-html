import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from '@testing-library/react-native';
import { getLastAncestorOfType } from './utils';

function expectFirstTextToHaveSelectable(html: string, matchingString: string) {
  const { getByText } = render(
    <RenderHTML
      debug={false}
      defaultTextProps={{ selectable: true }}
      source={{ html }}
    />
  );
  const text = getByText(matchingString);
  const ancestorText = getLastAncestorOfType(text);
  expect(ancestorText).toBe(null);
  expect(text).toHaveProp('selectable', true);
}

/**
 * https://github.com/meliorence/react-native-render-html/issues/193
 */
describe('RenderHTML component', () => {
  describe('should pass regression #193 regarding defaultTextProps.selectable prop', () => {
    it('should pass example #1', () => {
      expectFirstTextToHaveSelectable('<div>selectable</div>', 'selectable');
    });
    it('should pass example #2', () => {
      expectFirstTextToHaveSelectable(
        '<div>selectable<img src=""/></div>',
        'selectable'
      );
    });
    it('should pass example #3', () => {
      expectFirstTextToHaveSelectable(
        '<div><div>selectable</div><img src=""/></div>',
        'selectable'
      );
    });
  });
});
