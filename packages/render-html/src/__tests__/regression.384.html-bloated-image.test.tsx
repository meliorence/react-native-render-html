import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from 'react-native-testing-library';
import HTMLImageElement from '../elements/HTMLImageElement';

/**
 * https://github.com/meliorence/react-native-render-html/issues/384
 **/
describe('RenderHTML component', () => {
  describe('should pass regression regarding RenderHTML props passed to image renderer', () => {
    it('translated image elements should not contain a renderers prop', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          debug={false}
          source={{ html: '<img src="https://img.com/1"/>' }}
        />
      );
      const image = UNSAFE_getByType(HTMLImageElement);
      expect(image.props.renderers).toBeUndefined();
    });
  });
});
