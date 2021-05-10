import { useMemo } from 'react';
import TRenderEngine, {
  HTMLModelRecord,
  TagName
} from '@native-html/transient-render-engine';
import { TransientRenderEngineConfig } from '../shared-types';

/**
 * @internal
 */
export default function useTRenderEngine(props: TransientRenderEngineConfig) {
  const {
    allowedStyles,
    ignoredStyles,
    ignoredDomTags,
    ignoreDomNode,
    domVisitors,
    htmlParserOptions,
    baseStyle,
    classesStyles,
    tagsStyles,
    idsStyles,
    enableCSSInlineProcessing,
    enableUserAgentStyles,
    fallbackFonts,
    systemFonts,
    customHTMLElementModels = {},
    emSize,
    setMarkersForTNode,
    triggerTREInvalidationPropNames
  } = props;
  const isFontSupported = useMemo(() => {
    const fontMap = {} as Record<string, true>;
    systemFonts!.forEach((font) => {
      fontMap[font] = true;
    });
    return (fontFamily: string) => {
      if (fallbackFonts![fontFamily as keyof typeof fallbackFonts]) {
        return fallbackFonts![fontFamily as keyof typeof fallbackFonts];
      }
      return fontMap[fontFamily] || false;
    };
  }, [systemFonts, fallbackFonts]);
  const tbuilderDeps = (triggerTREInvalidationPropNames || []).map(
    (key) => props[key]
  );
  const customizeHTMLModels = !Object.keys(customHTMLElementModels).length
    ? (defaultModels: HTMLModelRecord<TagName>): HTMLModelRecord<TagName> => {
        return { ...defaultModels, ...customHTMLElementModels };
      }
    : undefined;
  return useMemo(
    () =>
      new TRenderEngine({
        customizeHTMLModels,
        cssProcessorConfig: {
          isFontSupported,
          inlinePropertiesBlacklist: ignoredStyles,
          inlinePropertiesWhitelist: allowedStyles,
          rootFontSize: emSize
        },
        htmlParserOptions: {
          decodeEntities: true,
          ...htmlParserOptions
        },
        stylesConfig: {
          baseStyle,
          enableCSSInlineProcessing,
          enableUserAgentStyles,
          classesStyles,
          idsStyles,
          tagsStyles
        },
        ignoredDomTags,
        ignoreDomNode,
        domVisitors,
        setMarkersForTNode
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...tbuilderDeps, isFontSupported]
  );
}
