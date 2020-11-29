import React from 'react';
import { Text, View } from 'react-native';
import RenderHTML from '../RenderHTML';
import { render } from 'react-native-testing-library';
import { CustomBlockRenderer } from '../render/render-types';
import { HTMLContentModel } from '@native-html/transient-render-engine';

/**
 * https://github.com/archriss/react-native-render-html/issues/276
 */
describe('RenderHTML component', () => {
  describe('should pass regression #276 regarding customRenderer prop', () => {
    it('when provided, should use View wrapper to render a tag which has been defined in customRenderers and which default wrapper is Text', () => {
      const Span = () => (
        <View>
          <Text>Tadad</Text>
        </View>
      );
      const SpanRenderer: CustomBlockRenderer = () => (
        <View>
          <Span />
        </View>
      );
      SpanRenderer.model = {
        contentModel: HTMLContentModel.block
      };
      const customRenderers = {
        span: SpanRenderer
      };
      const { UNSAFE_getByType } = render(
        <RenderHTML
          debug={false}
          html={'<p>foo<span>hello world</span></p>'}
          renderers={customRenderers}
        />
      );
      const span = UNSAFE_getByType(Span);
      expect(span.parent?.type).toBe('View');
    });
  });
});
