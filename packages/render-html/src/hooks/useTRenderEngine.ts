import { useMemo } from 'react';
import { TRenderEngineConfig } from '../shared-types';
import buildTREFromConfig from '../helpers/buildTREFromConfig';
import useProfiler from './useProfiler';

/**
 * @internal
 */
export default function useTRenderEngine({
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
