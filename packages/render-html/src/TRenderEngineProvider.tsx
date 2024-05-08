import TRenderEngine from '@native-html/transient-render-engine';
import React, { PropsWithChildren, ReactElement } from 'react';
import useTRenderEngine from './hooks/useTRenderEngine';
import { TRenderEngineConfig } from './shared-types';

const defaultTRenderEngine = {} as any;

const TRenderEngineContext =
  React.createContext<TRenderEngine>(defaultTRenderEngine);

/**
 * Use the ambient transient render engine.
 *
 * @returns The ambient transient render engine.
 *
 * @public
 */
export function useAmbientTRenderEngine() {
  const engine = React.useContext(TRenderEngineContext);
  if (
    typeof __DEV__ === 'boolean' &&
    __DEV__ &&
    engine === defaultTRenderEngine
  ) {
    console.error('TRenderEngineProvider is missing in the render tree.');
  }
  return engine;
}

/**
 * A react component to share a {@link TRenderEngine} instance across different
 * rendered contents via {@link RenderHTMLSource}. This can significantly enhance
 * performance in applications with potentially dozens or hundreds of distinct
 * rendered snippets such as chat apps.
 *
 * @param props - Pass engine config here.
 */
export default function TRenderEngineProvider({
  children,
  ...config
}: PropsWithChildren<TRenderEngineConfig>): ReactElement {
  const engine = useTRenderEngine(config);
  return (
    <TRenderEngineContext.Provider value={engine}>
      {children}
    </TRenderEngineContext.Provider>
  );
}
