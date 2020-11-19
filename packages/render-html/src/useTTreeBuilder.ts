import { useMemo } from 'react';
import { TTreeBuilder } from '@native-html/transient-render-tree';
import { RenderHTMLProps } from './types';

export default function useTTreeBuilder({
  allowedStyles,
  ignoredStyles,
  decodeEntities,
  baseStyle,
  classesStyles,
  tagsStyles,
  idsStyles,
  enableCSSInlineProcessing,
  enableUserAgentStyles
}: RenderHTMLProps) {
  return useMemo(
    () =>
      new TTreeBuilder({
        cssProcessorConfig: {
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
      tagsStyles
    ]
  );
}