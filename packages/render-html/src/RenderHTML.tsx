import React from 'react';

import { RenderHTMLProps } from './shared-types';

import TRenderEngineProvider from './TRenderEngineProvider';
import RenderHTMLFragment from './RenderHTMLFragment';

/**
 * Render HTML text in native views!
 *
 * @remarks - If your application uses many instances of this component, you
 * should share the render engine across those instances via the
 * `TRenderEngineProvier` component, and render the HTML with
 * `RenderHTMLFragment` instead. That should significantly increase
 * performance.
 *
 * @param props - Props for this component.
 */
export default function RenderHTML(props: RenderHTMLProps) {
  return (
    <TRenderEngineProvider {...props}>
      {React.createElement(RenderHTMLFragment, props)}
    </TRenderEngineProvider>
  );
}
