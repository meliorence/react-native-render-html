import React from 'react';
import RenderHTML from '../RenderHTML';
import renderer from 'react-test-renderer';
import { extractTextFromInstance } from './utils';
/**
 * https://github.com/archriss/react-native-render-html/issues/118
 */
describe('RenderHTML component', () => {
  jest.useFakeTimers();
  it('should pass regression #118 regarding handling of CSS white-space', () => {
    const testRenderer = renderer.create(
      <RenderHTML debug={false} html={'  <div>  foo\n\nbar  baz  </div>'} />
    );
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual('foo bar baz');
  });
});
