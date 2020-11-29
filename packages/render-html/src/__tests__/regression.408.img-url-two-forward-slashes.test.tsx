import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from 'react-native-testing-library';
import HTMLImageElement from '../elements/HTMLImageElement';

/**
 * https://github.com/archriss/react-native-render-html/issues/408
 */
describe('RenderHTML component', () => {
  describe('should pass regression #408 regarding two forward slashes in src', () => {
    it("should prepend 'https:' to an image src attribute with two forward slashes", () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML debug={false} html={'<img src="//domain.com/" />'} />
      );
      const image = UNSAFE_getByType(HTMLImageElement);
      expect(image.props.source).toMatchObject({ uri: 'https://domain.com/' });
    });
  });
});
