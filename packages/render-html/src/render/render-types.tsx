import {
  TBlock,
  TPhrasing,
  TText,
  HTMLContentModel,
  CustomElementModel,
  TNode
} from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { RendererProps, TDefaultRendererProps } from '../shared-types';

export interface RendererSpecs<M extends HTMLContentModel> {
  model: Omit<CustomElementModel<any, M>, 'tagName'> & {
    contentModel: M;
  };
}

export type RendererDeclaration<M extends HTMLContentModel> =
  | LiteRendererDeclaration<M>
  | RendererFromContentModel<M>;

export interface LiteRendererDeclaration<M extends HTMLContentModel>
  extends RendererSpecs<M> {
  /**
   * When you define this function, the default renderer for this tnode will be
   * used, with the props returned by this function. This is peculiarly useful
   * to set specific `ViewProps` or `TextProps` for peculiar tags. Also note
   * that all all default tnode renderer support `onPress` prop, so you don't
   * need to use your own `Pressable` or `Touchable*`!
   *
   * @param syntheticProps - The props generated for this TNode.
   *
   * @remarks This function will be consumed as a hook, so you are free to use any hooks inside!
   */
  deriveTDefaultPropsForTNode?: <T extends TNode>(
    syntheticProps: TDefaultRendererProps<T>
  ) => TDefaultRendererProps<T>;
}

/**
 * Special internal renderers for non-printable text (wbr, br).
 */
export type InternalTextContentRenderer = ComponentType<{
  key?: string | number;
}> & {
  isNativeInternalTextRenderer: true;
};

/**
 * Block renderers can only render tnodes of type TBlock.
 */
export type BlockRenderer = ComponentType<RendererProps<TBlock>> &
  RendererSpecs<HTMLContentModel.block>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 */
export type TextualRenderer = ComponentType<RendererProps<TPhrasing | TText>> &
  RendererSpecs<HTMLContentModel.textual>;

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 */
export type MixedRenderer = ComponentType<
  RendererProps<TBlock | TPhrasing | TText>
> &
  RendererSpecs<HTMLContentModel.mixed>;

export type RendererFromContentModel<
  T extends HTMLContentModel
> = T extends HTMLContentModel.block
  ? BlockRenderer
  : T extends HTMLContentModel.textual
  ? TextualRenderer
  : T extends HTMLContentModel.mixed
  ? MixedRenderer
  : never;

export type RendererRecord = Record<string, RendererDeclaration<any>>;
