import { useMemo } from 'react';
import { TTreeBuilder } from '@native-html/transient-render-tree';
import { RenderHTMLProps } from './shared-types';

export default function useTTreeBuilder({
  allowedStyles,
  ignoredStyles,
  decodeEntities,
  baseStyle,
  classesStyles,
  tagsStyles,
  idsStyles,
  enableCSSInlineProcessing,
  enableUserAgentStyles,
  fallbackFonts,
  extraFonts
}: RenderHTMLProps) {
  const isFontSupported = useMemo(() => {
    const fontMap = {} as Record<string, true>;
    extraFonts!.forEach((font) => {
      fontMap[font] = true;
    });
    return (fontFamily: string) => {
      if (fallbackFonts![fontFamily as keyof typeof fallbackFonts]) {
        return fallbackFonts![fontFamily as keyof typeof fallbackFonts];
      }
      return fontMap[fontFamily] || false;
    };
  }, [extraFonts, fallbackFonts]);
  return useMemo(
    () =>
      new TTreeBuilder({
        cssProcessorConfig: {
          isFontSupported,
          inlinePropertiesBlacklist: ignoredStyles,
          inlinePropertiesWhitelist: allowedStyles
        },
        htmlParserOptions: {
          decodeEntities
        },
        stylesConfig: {
          baseStyle,
          enableCSSInlineProcessing,
          enableUserAgentStyles,
          classesStyles,
          idsStyles,
          tagsStyles
        }
      }),
    [
      allowedStyles,
      baseStyle,
      classesStyles,
      decodeEntities,
      enableCSSInlineProcessing,
      enableUserAgentStyles,
      idsStyles,
      ignoredStyles,
      tagsStyles,
      isFontSupported
    ]
  );
}
