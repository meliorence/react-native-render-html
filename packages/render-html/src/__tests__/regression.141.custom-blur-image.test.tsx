import React from 'react';
import { render } from '@testing-library/react-native';
import IMGElement from '../elements/IMGElement';

/**
 * https://github.com/meliorence/react-native-render-html/issues/141
 */
describe('HTMLImageElement component should pass regression test #141', () => {
  it("doesn't display the image prior to receiving original dimensions", async () => {
    const source = { uri: 'http://via.placeholder.com/640x360' };
    const style = {};
    const { findByTestId, getByTestId, queryByTestId } = render(
      <IMGElement key="1" style={style} source={source} />
    );
    const placeholder = getByTestId('image-loading');
    expect(placeholder).toBeTruthy();
    const imageLayout = queryByTestId('image-success');
    expect(imageLayout).toBeFalsy();
    await expect(
      findByTestId('image-success', { timeout: 100 })
    ).resolves.toBeTruthy();
  });
});
