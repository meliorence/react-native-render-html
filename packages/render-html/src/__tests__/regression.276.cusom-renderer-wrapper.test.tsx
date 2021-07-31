import React from 'react';
import { Text, View } from 'react-native';
import RenderHTML from '../RenderHTML';
import { render } from '@testing-library/react-native';
import { CustomBlockRenderer } from '../render/render-types';
import {
  HTMLContentModel,
  HTMLElementModel
} from '@native-html/transient-render-engine';

/**
 * https://github.com/meliorence/react-native-render-html/issues/276
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
      const customRenderers = {
        span: SpanRenderer
      };
      const { UNSAFE_getByType } = render(
        <RenderHTML
          debug={false}
          source={{ html: '<p>foo<span>hello world</span></p>' }}
          renderers={customRenderers}
          customHTMLElementModels={{
            span: HTMLElementModel.fromCustomModel({
              tagName: 'span',
              contentModel: HTMLContentModel.block
            })
          }}
        />
      );
      const span = UNSAFE_getByType(Span);
      expect(span.parent?.type).toBe('View');
    });
  });
});
