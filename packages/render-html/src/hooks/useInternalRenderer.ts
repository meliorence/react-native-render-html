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

const specialRenderersConfig = {
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

export type InternalSpecialRenderedTag = keyof typeof specialRenderersConfig;

function hasSpecialInternalRenderer(
  tagName: TagName
): tagName is keyof typeof specialRenderersConfig {
  return tagName in specialRenderersConfig;
}

export interface InternalRendererConfig<P> {
  Renderer: ComponentType<P>;
  rendererProps: P;
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
): T extends InternalSpecialRenderedTag
  ? InternalRendererConfig<ReturnType<typeof specialRenderersConfig[T]['hook']>>
  : InternalRendererConfig<TDefaultRendererProps<any>> {
  const { TDefaultRenderer, ...rendererProps } = props;
  if (hasSpecialInternalRenderer(tagName)) {
    return {
      Renderer: specialRenderersConfig[tagName].Element || TDefaultRenderer,
      rendererProps: specialRenderersConfig[tagName].hook(props as any)
    } as any;
  }
  return {
    Renderer: TDefaultRenderer,
    rendererProps
  } as any;
}
