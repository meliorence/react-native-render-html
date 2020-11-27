import React from 'react';
import { HTMLContentModel } from '@native-html/transient-render-engine';
import {
  CustomTagRendererFromModel,
  CustomRendererSpecs
} from './render-types';
import { DefaultTagRenderer } from '../shared-types';

/**
 * Extend a default renderer to specialize its element model.
 *
 * @param Renderer - The component to extend.
 * @param model - The new element model.
 */
export default function extendRenderer<N extends HTMLContentModel>(
  Renderer: DefaultTagRenderer<any>,
  model: CustomRendererSpecs<N>['model']
) {
  const localRenderer = Renderer;
  const newRenderer: CustomTagRendererFromModel<N> = function () {
    return React.createElement(localRenderer as any, arguments[0]);
  } as any;
  newRenderer.displayName = Renderer.displayName;
  newRenderer.model = model as any;
  return newRenderer;
}
