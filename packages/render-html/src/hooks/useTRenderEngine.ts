import { useMemo } from 'react';
import TRenderEngine, {
  HTMLContentModel,
  HTMLElementModel,
  HTMLModelRecord,
  TagName
} from '@native-html/transient-render-engine';
import { RenderResolvedHTMLProps } from '../shared-types';
import { CustomRendererSpecs } from '../render/render-types';
import lookupRecord from '../helpers/lookupRecord';

export default function useTRenderEngine(props: RenderResolvedHTMLProps) {
  const {
    allowedStyles,
    ignoredStyles,
    ignoredTags,
    htmlParserOptions,
    baseStyle,
    classesStyles,
    tagsStyles,
    idsStyles,
    enableCSSInlineProcessing,
    enableUserAgentStyles,
    fallbackFonts,
    systemFonts,
    renderers = {},
    emSize,
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
    if (!customRenderersKeys.length && !ignoredTags?.length) {
      return defaultModels;
    }
    customRenderersKeys.forEach((key) => {
      const renderer = renderers[key] as CustomRendererSpecs<HTMLContentModel>;
      if (lookupRecord(defaultModels, key)) {
        if (renderer.model && defaultModels[key] !== renderer.model) {
          if (renderer.model instanceof HTMLElementModel) {
            additionalModels[key] = renderer.model;
          } else {
            additionalModels[key] = HTMLElementModel.fromCustomModel({
              ...renderer.model,
              tagName: key as any
            });
          }
        } else if (
          !renderer.model &&
          defaultModels[key].contentModel === HTMLContentModel.mixed
        ) {
          __DEV__ &&
            console.warn(
              `You are defining a custom renderer for tag "${key}" which has a mixed content model.` +
                'Be advised that this tag can be translated to TBlock, TText or Tphrasing nodes. ' +
                'You must explicitly set the corresponding HTMLElementModel from "defaultHTMLElementModels" ' +
                'as a static "model" field of your renderer to show you understand the constrains inherent to ' +
                'those renderers.'
            );
        }
      } else {
        if (renderer.model) {
          additionalModels[key] = HTMLElementModel.fromCustomModel({
            ...renderer.model,
            tagName: key
          });
        } else {
          __DEV__ &&
            console.error(
              `You must provide a model in custom renderer for tag "${key}". Set the "model" static field ` +
                'of your custom renderer.'
            );
        }
      }
    });
    ignoredTags?.forEach((tag) => {
      additionalModels[tag] = HTMLElementModel.fromCustomModel({
        contentModel: HTMLContentModel.none,
        tagName: tag
      });
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
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...tbuilderDeps, isFontSupported]
  );
}
