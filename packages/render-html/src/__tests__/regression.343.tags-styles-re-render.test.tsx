import React from 'react';
import { StyleSheet } from 'react-native';
import RenderHTML from '../RenderHTML';
import { render } from 'react-native-testing-library';

/**
 * https://github.com/archriss/react-native-render-html/issues/343
 */
describe('RenderHTML component', () => {
  const letterSpacing2 = {
    letterSpacing: 2
  };
  const letterSpacing3 = {
    letterSpacing: 3
  };
  const tagsStylesInstance1 = {
    a: letterSpacing2
  };
  const tagsStylesInstance2 = {
    a: letterSpacing3
  };
  it('should pass regression #343 regarding tagsStyles prop (requires triggerTREInvalidationPropNames)', () => {
    const { getByText, update } = render(
      <RenderHTML
        debug={false}
        source={{ html: '<a>hello world</a>' }}
        tagsStyles={tagsStylesInstance1}
        triggerTREInvalidationPropNames={['tagsStyles']}
      />
    );
    update(
      <RenderHTML
        debug={false}
        source={{ html: '<a>hello world</a>' }}
        tagsStyles={tagsStylesInstance2}
        triggerTREInvalidationPropNames={['tagsStyles']}
      />
    );
    const text = getByText('hello world');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject(letterSpacing3);
  });
});
