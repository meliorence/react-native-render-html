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
import internalRenderers from './internalRenderers';

/**
 * Extend an internal renderer to override its element model.
 *
 * @param Renderer - The internal renderer to extend, or the corresponding tagName.
 * @param model - The new element model.
 */
export default function extendInternalRenderer<N extends HTMLContentModel>(
  renderer:
    | DefaultTagRendererFromModel<any>
    | Extract<TagName, keyof typeof internalRenderers>,
  model: Partial<HTMLElementModelProperties<any, N>>
) {
  const localRenderer =
    typeof renderer === 'string' ? internalRenderers[renderer] : renderer;
  if (!localRenderer && typeof renderer === 'string') {
    throw new TypeError(
      'extendInternalRenderer: there is no internal renderer to extend for tag ' +
        renderer
    );
  }
  const newRenderer: CustomTagRendererFromModel<N> = function (props: any) {
    return React.createElement(localRenderer as any, props);
  } as any;
  newRenderer.displayName = localRenderer.displayName;
  newRenderer.model = localRenderer.model.extend(model) as any;
  return newRenderer;
}
