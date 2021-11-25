import React from 'react';
import RenderHTML from '../RenderHTML';
import { render } from '@testing-library/react-native';

/**
 * https://github.com/meliorence/react-native-render-html/issues/524
 **/
describe('RenderHTML component', () => {
  describe('should pass regression regarding percent width', () => {
    it('dimensions should not be derived from aspect ratio', async () => {
      const renderersProps = {
        img: {
          enableExperimentalPercentWidth: true
        }
      };
      const { findByTestId } = render(
        <RenderHTML
          debug={false}
          contentWidth={300}
          renderersProps={renderersProps}
          source={{
            html: '<img style="width:100%" src="https://img.com/1920x1080" width="800" height="400"/>'
          }}
        />
      );
      const img = await findByTestId('image-success');
      expect(img).toHaveStyle({
        width: 300,
        height: 400
      });
    });
  });
});
