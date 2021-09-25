import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from '@testing-library/react-native';
import IMGElement from '../elements/IMGElement';

/**
 * https://github.com/meliorence/react-native-render-html/issues/408
 */
describe('RenderHTML component', () => {
  describe('should pass regression #408 regarding two forward slashes in src', () => {
    it("should prepend 'https:' to an image src attribute with two forward slashes", () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          debug={false}
          source={{
            html: '<img src="//domain.com/" />',
            baseUrl: 'https://test.com'
          }}
        />
      );
      const image = UNSAFE_getByType(IMGElement);
      expect(image).toHaveProp('source', { uri: 'https://domain.com/' });
    });
  });
});
