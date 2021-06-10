import { TRenderEngineConfig } from '../shared-types';
import TRenderEngine, {
  HTMLModelRecord,
  TagName
} from '@native-html/transient-render-engine';

/**
 * Build a {@link TRenderEngine} instance from a configuration object.
 *
 * @remarks This utility can be useful to test and debug the TRE layer of your
 * application.
 *
 * @param props - The configuration from which a TRE should be built.
 */
export default function buildTREFromConfig(props: TRenderEngineConfig) {
  const {
    allowedStyles,
    // TODO fix upstream
    ignoredStyles = [],
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
    systemFonts = [],
    fallbackFonts = {},
    customHTMLElementModels = {},
    emSize,
    setMarkersForTNode,
    selectDomRoot,
    dangerouslyDisableHoisting,
    dangerouslyDisableWhitespaceCollapsing
  } = props;
  const customizeHTMLModels = Object.keys(customHTMLElementModels).length
    ? (defaultModels: HTMLModelRecord<TagName>): HTMLModelRecord<TagName> => {
        return { ...defaultModels, ...customHTMLElementModels };
      }
    : undefined;
  const fontMap = {} as Record<string, true>;
  systemFonts.forEach((font) => {
    fontMap[font] = true;
  });
  const isFontSupported = (fontFamily: string) => {
    if (fallbackFonts[fontFamily as keyof typeof fallbackFonts]) {
      return fallbackFonts[fontFamily as keyof typeof fallbackFonts];
    }
    /* istanbul ignore next */
    return fontMap[fontFamily] || false;
  };
  return new TRenderEngine({
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
    setMarkersForTNode,
    selectDomRoot,
    dangerouslyDisableHoisting,
    dangerouslyDisableWhitespaceCollapsing
  });
}
