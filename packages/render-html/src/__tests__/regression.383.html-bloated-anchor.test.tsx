import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from '@testing-library/react-native';

/**
 * https://github.com/meliorence/react-native-render-html/issues/383
 **/
describe('RenderHTML component', () => {
  describe('should pass regression regarding RenderHTML props passed to anchor renderer', () => {
    it('translated anchor elements should not contain a renderers prop', () => {
      const { getByText } = render(
        <RenderHTML debug={false} source={{ html: '<a>bar</a>' }} />
      );
      const anchor = getByText('bar');
      expect(anchor).not.toHaveProp('renderers');
    });
  });
});
