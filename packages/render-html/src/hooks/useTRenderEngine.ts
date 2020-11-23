import { useMemo } from 'react';
import TRenderEngine, {
  HTMLContentModel,
  HTMLElementModel,
  HTMLModelRecord,
  TagName
} from '@native-html/transient-render-engine';
import { RenderHTMLProps } from '../shared-types';
import { RendererSpecs } from '../render/render-types';
import lookupRecord from '../helpers/lookupRecord';

export default function useTRenderEngine(props: RenderHTMLProps) {
  const {
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
    systemFonts,
    renderers = {},
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
  const customizeHTMLModels = (
    defaultModels: HTMLModelRecord<TagName>
  ): HTMLModelRecord<TagName> => {
    const additionalModels: HTMLModelRecord<string> = {};
    const customRenderersKeys = Object.keys(renderers) as Array<
      keyof typeof renderers
    >;
    if (!customRenderersKeys.length) {
      return defaultModels;
    }
    customRenderersKeys.forEach((key) => {
      const renderer = renderers[key] as RendererSpecs<HTMLContentModel>;
      if (!renderer.model && __DEV__) {
        console.warn(
          `A model should be provided in renderer for tag "${key}".`
        );
      }
      if (lookupRecord(defaultModels, key)) {
        if (defaultModels[key] !== renderer.model) {
          if (renderer.model instanceof HTMLElementModel) {
            additionalModels[key] = renderer.model;
          } else {
            additionalModels[key] = HTMLElementModel.fromCustomModel({
              ...renderer.model,
              tagName: key as any
            });
          }
        }
      } else {
        if (renderer.model) {
          additionalModels[key] = HTMLElementModel.fromCustomModel({
            ...renderer.model,
            tagName: key,
            // @ts-ignore
            isTranslatable: true
          });
        } else {
          console.error(
            `You must provide a model in custom renderer for tag "${key}".`
          );
        }
      }
    });
    return { ...defaultModels, ...additionalModels };
  };
  return useMemo(
    () =>
      new TRenderEngine({
        customizeHTMLModels,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...tbuilderDeps, isFontSupported]
  );
}
