import React from 'react';
import { RenderHTMLProps } from './shared-types';
import RenderHTMLDebug from './RenderHTMLDebug';
import TRenderEngineProvider from './TRenderEngineProvider';
import RenderHTMLConfigProvider from './RenderHTMLConfigProvider';
import RenderHTMLSource from './RenderHTMLSource';

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
 *
 * @public
 */
export default function RenderHTML(props: RenderHTMLProps) {
  const {
    source,
    onHTMLLoaded,
    onTTreeChange,
    onDocumentMetadataLoaded,
    contentWidth,
    ...config
  } = props;
  return (
    <RenderHTMLDebug {...props}>
      <TRenderEngineProvider {...props}>
        <RenderHTMLConfigProvider {...config}>
          {React.createElement(RenderHTMLSource, {
            source,
            onHTMLLoaded,
            onTTreeChange,
            onDocumentMetadataLoaded,
            contentWidth
          })}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    </RenderHTMLDebug>
  );
}
