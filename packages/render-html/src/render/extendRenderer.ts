import React from 'react';
import { HTMLContentModel } from '@native-html/transient-render-engine';
import {
  LiteRendererDeclaration,
  RendererDeclaration,
  RendererFromContentModel,
  RendererSpecs
} from './render-types';

/**
 * Extend a default renderer to specialize its element model.
 *
 * @param Renderer - The component to extend.
 * @param model - The new element model.
 */
export default function extendRenderer<N extends HTMLContentModel>(
  Renderer: RendererDeclaration<any>,
  model: RendererSpecs<N>['model']
) {
  if (typeof Renderer === 'function') {
    const localRenderer = Renderer;
    const newRenderer: RendererFromContentModel<N> = function () {
      return React.createElement(localRenderer as any, arguments[0]);
    } as any;
    newRenderer.displayName = Renderer.displayName;
    newRenderer.model = model as any;
    return newRenderer;
  }
  return {
    ...Renderer,
    model
  } as LiteRendererDeclaration<N>;
}
