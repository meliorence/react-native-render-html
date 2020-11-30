import React from 'react';
import { StyleSheet } from 'react-native';
import RenderHTML from '../RenderHTML';
import { render } from 'react-native-testing-library';

/**
 * https://github.com/archriss/react-native-render-html/issues/344
 */
describe('RenderHTML component should pass regression #344', () => {
  it('when anchors nested in paragraphs have their tagStyles overridden by inline inheritance', () => {
    const tagsStyles = {
      p: {
        color: 'red'
      },
      a: {
        color: 'green'
      }
    };
    const { getByTestId } = render(
      <RenderHTML
        debug={false}
        tagsStyles={tagsStyles}
        html='<p><img src="https://img.com/1"/>foo<a>bar</a></p>'
      />
    );
    const text = getByTestId('a');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: 'green'
    });
  });
});
