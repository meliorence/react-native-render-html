import { TagName } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import IMGElement from '../elements/IMGElement';
import OLElement from '../elements/OLElement';
import ULElement from '../elements/ULElement';
import { useAElementProps } from '../renderers/ARenderer';
import { useIMGElementProps } from '../renderers/IMGRenderer';
import { useOLElementProps } from '../renderers/OLRenderer';
import { useULElementProps } from '../renderers/ULRenderer';
import { InternalRendererProps, TDefaultRendererProps } from '../shared-types';

/**
 * @public
 */
export interface InternalRendererConfig<P> {
  Renderer: ComponentType<P>;
  rendererProps: P;
}

/**
 * @public
 */
export type InternalRenderersConfigMap = typeof internalRenderersConfigMap;

/**
 * The name of tags which are rendered by special renderers internally.
 *
 * @public
 */
export type InternalRendererTag = keyof InternalRenderersConfigMap;

const internalRenderersConfigMap = {
  img: {
    hook: useIMGElementProps,
    Element: IMGElement
  },
  ol: {
    hook: useOLElementProps,
    Element: OLElement
  },
  ul: {
    hook: useULElementProps,
    Element: ULElement
  },
  a: {
    hook: useAElementProps,
    Element: undefined
  }
};

function hasSpecialInternalRenderer(
  tagName: TagName
): tagName is keyof InternalRenderersConfigMap {
  return tagName in internalRenderersConfigMap;
}

/**
 * Resuse internal renderers logic for infinite customization!
 *
 * @remarks `tagName` must be invariant, i.e. it cannot change. You would
 * otherwise break the rules of hooks.
 *
 * @param tagName - **Invariant** The tag name to extend.
 * @param props - The props passed to the custom renderer.
 * @typeParam T - The name of the tag to target.
 * @returns An object with two fields: `Renderer` (the internal react
 * component) and `rendererProps`, the internal component props.
 *
 * @public
 */
export default function useInternalRenderer<T extends TagName>(
  tagName: T,
  props: InternalRendererProps<any>
): T extends InternalRendererTag
  ? InternalRendererConfig<ReturnType<InternalRenderersConfigMap[T]['hook']>>
  : InternalRendererConfig<TDefaultRendererProps<any>> {
  const { TDefaultRenderer, ...rendererProps } = props;
  if (hasSpecialInternalRenderer(tagName)) {
    return {
      Renderer: internalRenderersConfigMap[tagName].Element || TDefaultRenderer,
      rendererProps: internalRenderersConfigMap[tagName].hook(props as any)
    } as any;
  }
  return {
    Renderer: TDefaultRenderer,
    rendererProps
  } as any;
}
