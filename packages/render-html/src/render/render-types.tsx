import {
  TBlock,
  TPhrasing,
  TText,
  HTMLContentModel,
  CustomElementModel,
  HTMLElementModel
} from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import {
  CustomTagRenderer,
  InternalRenderer,
  PropsFromParent
} from '../shared-types';

export interface CustomRendererSpecs<M extends HTMLContentModel> {
  model: Omit<CustomElementModel<any, M>, 'tagName'> & {
    contentModel: M;
  };
}

export interface DefaultRendererSpecs<M extends HTMLContentModel> {
  model: HTMLElementModel<string, M>;
}

/**
 * Special internal renderers for non-printable text (wbr, br).
 */
export type InternalTextContentRenderer = ComponentType<{
  key?: string | number;
}> & {
  isNativeInternalTextRenderer: true;
};

export type CustomLiteRenderer<
  M extends HTMLContentModel
> = CustomRendererSpecs<M>;

export type DefaultBlockRenderer = InternalRenderer<TBlock> &
  DefaultRendererSpecs<HTMLContentModel.block>;

/**
 * Block renderers can only render tnodes of type TBlock.
 */
export type CustomBlockRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TBlock, P> &
  Partial<CustomRendererSpecs<HTMLContentModel.block>>;

export type DefaultTextualRenderer<
  P extends PropsFromParent = PropsFromParent
> = InternalRenderer<TText | TPhrasing, P> &
  DefaultRendererSpecs<HTMLContentModel.textual>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 */
export type CustomTextualRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TText | TPhrasing, P> &
  Partial<CustomRendererSpecs<HTMLContentModel.textual>>;

export type DefaultMixedRenderer<
  P extends PropsFromParent = PropsFromParent
> = InternalRenderer<TBlock | TPhrasing | TText, P> &
  DefaultRendererSpecs<HTMLContentModel.mixed>;

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 */
export type CustomMixedRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TBlock | TPhrasing | TText, P> &
  Partial<CustomRendererSpecs<HTMLContentModel.mixed>>;

export type CustomTagRendererFromModel<
  T extends HTMLContentModel
> = T extends HTMLContentModel.block
  ? CustomBlockRenderer<any>
  : T extends HTMLContentModel.textual
  ? CustomTextualRenderer<any>
  : T extends HTMLContentModel.mixed
  ? CustomMixedRenderer<any>
  : never;

export type DefaultTagRendererFromModel<
  T extends HTMLContentModel
> = T extends HTMLContentModel.block
  ? DefaultBlockRenderer
  : T extends HTMLContentModel.textual
  ? DefaultTextualRenderer
  : T extends HTMLContentModel.mixed
  ? DefaultMixedRenderer
  : never;

export type DefaultTagRendererRecord<T extends string> = Record<
  T,
  DefaultTagRendererFromModel<any>
>;

export type CustomTagRendererRecord = Record<
  string,
  CustomTagRendererFromModel<any> | CustomLiteRenderer<any>
>;
