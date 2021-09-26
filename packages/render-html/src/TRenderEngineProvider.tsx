import TRenderEngine from '@native-html/transient-render-engine';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import useTRenderEngine from './hooks/useTRenderEngine';
import { TRenderEngineConfig } from './shared-types';
import defaultSystemFonts from './defaultSystemFonts';

const defaultTRenderEngine = {} as any;

const TRenderEngineContext =
  React.createContext<TRenderEngine>(defaultTRenderEngine);

export const tRenderEngineProviderPropTypes: Record<
  keyof TRenderEngineConfig,
  any
> = {
  customHTMLElementModels: PropTypes.object.isRequired,
  enableCSSInlineProcessing: PropTypes.bool,
  enableUserAgentStyles: PropTypes.bool,
  idsStyles: PropTypes.object,
  ignoredDomTags: PropTypes.array,
  ignoreDomNode: PropTypes.func,
  domVisitors: PropTypes.object,
  ignoredStyles: PropTypes.array.isRequired,
  allowedStyles: PropTypes.array,
  htmlParserOptions: PropTypes.object,
  tagsStyles: PropTypes.object,
  classesStyles: PropTypes.object,
  emSize: PropTypes.number.isRequired,
  baseStyle: PropTypes.object,
  systemFonts: PropTypes.arrayOf(PropTypes.string),
  fallbackFonts: PropTypes.shape({
    serif: PropTypes.string,
    'sans-serif': PropTypes.string,
    monospace: PropTypes.string
  }),
  setMarkersForTNode: PropTypes.func,
  dangerouslyDisableHoisting: PropTypes.bool,
  dangerouslyDisableWhitespaceCollapsing: PropTypes.bool,
  selectDomRoot: PropTypes.func
};

/**
 * Default fallback font for special keys such as 'sans-serif', 'monospace',
 * 'serif', based on current platform.
 */
export const defaultFallbackFonts = {
  'sans-serif': Platform.select({ ios: 'system', default: 'sans-serif' }),
  monospace: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  serif: Platform.select({ ios: 'Times New Roman', default: 'serif' })
};

export const defaultTRenderEngineProviderProps: TRenderEngineConfig = {
  htmlParserOptions: {
    decodeEntities: true
  },
  emSize: 14,
  ignoredDomTags: [],
  ignoredStyles: [],
  baseStyle: { fontSize: 14 },
  tagsStyles: {},
  classesStyles: {},
  enableUserAgentStyles: true,
  enableCSSInlineProcessing: true,
  customHTMLElementModels: {},
  fallbackFonts: defaultFallbackFonts,
  systemFonts: defaultSystemFonts
};

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

/**
 * @ignore
 */
TRenderEngineProvider.defaultProps = defaultTRenderEngineProviderProps;

/**
 * @ignore
 */
TRenderEngineProvider.propTypes = tRenderEngineProviderPropTypes;
