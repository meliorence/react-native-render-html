import { useMemo } from 'react';
import { Platform } from 'react-native';
import { TRenderEngineConfig } from '../shared-types';
import buildTREFromConfig from '../helpers/buildTREFromConfig';
import useProfiler from './useProfiler';
import defaultSystemFonts from '../defaultSystemFonts';

/**
 * Default fallback font for special keys such as 'sans-serif', 'monospace',
 * 'serif', based on current platform.
 */
export const defaultFallbackFonts = {
  'sans-serif': Platform.select({ ios: 'system', default: 'sans-serif' }),
  monospace: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  serif: Platform.select({ ios: 'Times New Roman', default: 'serif' })
};

/**
 * @internal
 */
export default function useTRenderEngine({
  allowedStyles,
  baseStyle = { fontSize: 14 },
  classesStyles = {},
  customHTMLElementModels = {},
  dangerouslyDisableHoisting,
  dangerouslyDisableWhitespaceCollapsing,
  domVisitors,
  emSize = 14,
  enableCSSInlineProcessing = true,
  enableUserAgentStyles = true,
  fallbackFonts = defaultFallbackFonts,
  htmlParserOptions = { decodeEntities: true },
  idsStyles,
  ignoreDomNode,
  ignoredDomTags = [],
  ignoredStyles = [],
  selectDomRoot,
  setMarkersForTNode,
  systemFonts = defaultSystemFonts,
  tagsStyles = {}
}: TRenderEngineConfig) {
  const profile = useProfiler({ name: 'TRenderEngineProvider' });
  return useMemo(() => {
    typeof __DEV__ === 'boolean' && __DEV__ && profile();
    return buildTREFromConfig({
      allowedStyles,
      baseStyle,
      classesStyles,
      customHTMLElementModels,
      dangerouslyDisableHoisting,
      dangerouslyDisableWhitespaceCollapsing,
      domVisitors,
      emSize,
      enableCSSInlineProcessing,
      enableUserAgentStyles,
      fallbackFonts,
      htmlParserOptions,
      idsStyles,
      ignoreDomNode,
      ignoredDomTags,
      ignoredStyles,
      selectDomRoot,
      setMarkersForTNode,
      systemFonts,
      tagsStyles
    });
  }, [
    profile,
    allowedStyles,
    baseStyle,
    classesStyles,
    customHTMLElementModels,
    dangerouslyDisableHoisting,
    dangerouslyDisableWhitespaceCollapsing,
    domVisitors,
    emSize,
    enableCSSInlineProcessing,
    enableUserAgentStyles,
    fallbackFonts,
    htmlParserOptions,
    idsStyles,
    ignoreDomNode,
    ignoredDomTags,
    ignoredStyles,
    selectDomRoot,
    setMarkersForTNode,
    systemFonts,
    tagsStyles
  ]);
}
