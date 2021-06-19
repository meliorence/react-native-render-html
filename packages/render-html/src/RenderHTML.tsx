import React, { ReactElement } from 'react';
import { RenderHTMLProps } from './shared-types';
import RenderHTMLDebug from './RenderHTMLDebug';
import TRenderEngineProvider from './TRenderEngineProvider';
import RenderHTMLConfigProvider from './RenderHTMLConfigProvider';
import RenderHTMLSource from './RenderHTMLSource';

/**
 * Render HTML text in native views!
 *
 * @remarks If your application uses many instances of this component, you
 * should share the render engine across those instances via the
 * {@link TRenderEngineProvider} and {@link RenderHTMLConfigProvider}
 * components, and render the HTML with {@link RenderHTMLSource} instead. That
 * should significantly increase performance.
 *
 * @warning It should never be a child of a React Native `Text` element, as the
 * layout will break.
 *
 * @public
 */
export default function RenderHTML(props: RenderHTMLProps): ReactElement {
  const {
    source,
    onHTMLLoaded,
    onTTreeChange,
    onDocumentMetadataLoaded,
    contentWidth,
    ...otherProps
  } = props;
  return (
    <RenderHTMLDebug {...props}>
      <TRenderEngineProvider {...otherProps}>
        <RenderHTMLConfigProvider {...otherProps}>
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
