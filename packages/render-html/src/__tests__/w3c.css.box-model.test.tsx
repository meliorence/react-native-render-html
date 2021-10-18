import React from 'react';
import RenderHTML from '../RenderHTML';
import IMGElement from '../elements/IMGElement';
import { render } from '@testing-library/react-native';
import { elementHasAncestorOfType } from './utils';
import { View, Text } from 'react-native';

describe('RenderHTML component should honor formatting context of the DOM tree', () => {
  it('should wrap text elements into a box formed by a View component', () => {
    const { getByText } = render(
      <RenderHTML debug={false} source={{ html: '<span>hello world</span>' }} />
    );
    const text = getByText('hello world');
    expect(elementHasAncestorOfType(text, View)).toBe(true);
  });
  it('should wrap sibling text elements into a box formed by a Text component', () => {
    const { getByText } = render(
      <RenderHTML
        debug={false}
        source={{ html: '<span>hello world</span><span>foo bar</span>' }}
      />
    );
    const span1 = getByText('hello world');
    expect(elementHasAncestorOfType(span1, Text)).toBe(true);
  });
  /*
   * We're asserting the following structure:
   *
   *
   *        View -- Text(hello world)
   *       /
   * Root /-View -- HTMLImageElement
   *      \
   *       \
   *        View -- Text(foo bar)
   */
  it('should cut embedded images inside inline formatting contexts into boxes', () => {
    const { UNSAFE_getByType } = render(
      <RenderHTML
        debug={false}
        source={{
          html: '<span><b>hello world</b><img src="https://img.com/1"/>foo bar</span>'
        }}
      />
    );
    const img = UNSAFE_getByType(IMGElement);
    expect(elementHasAncestorOfType(img, 'Text')).toBe(false);
  });
});
