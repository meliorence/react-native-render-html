import React from 'react';
import {
  HTMLContentModel,
  TagName
} from '@native-html/transient-render-engine';
import {
  CustomTagRendererFromModel,
  DefaultTagRendererFromModel
} from './render-types';
import { HTMLElementModelProperties } from '@native-html/transient-render-engine/lib/typescript/model/HTMLElementModel';
import defaultRenderers from './defaultRenderers';

/**
 * Extend a default renderer to override its element model.
 *
 * @param Renderer - The default component to extend, or the corresponding tagName.
 * @param model - The new element model.
 */
export default function extendDefaultRenderer<N extends HTMLContentModel>(
  renderer: DefaultTagRendererFromModel<any> | TagName,
  model: Partial<HTMLElementModelProperties<any, N>>
) {
  const localRenderer =
    typeof renderer === 'string' ? defaultRenderers[renderer] : renderer;
  const newRenderer: CustomTagRendererFromModel<N> = function (props: any) {
    return React.createElement(localRenderer as any, props);
  } as any;
  newRenderer.displayName = localRenderer.displayName;
  newRenderer.model = localRenderer.model.extend(model) as any;
  return newRenderer;
}
