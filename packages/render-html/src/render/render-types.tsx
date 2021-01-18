import {
  TBlock,
  TPhrasing,
  TText,
  HTMLContentModel,
  CustomElementModel,
  HTMLElementModel
} from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { CustomTagRenderer, DefaultTagRenderer } from '../shared-types';

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

export type DefaultBlockRenderer = DefaultTagRenderer<TBlock> &
  DefaultRendererSpecs<HTMLContentModel.block>;

/**
 * Block renderers can only render tnodes of type TBlock.
 */
export type CustomBlockRenderer = CustomTagRenderer<TBlock> &
  Partial<CustomRendererSpecs<HTMLContentModel.block>>;

export type DefaultTextualRenderer = DefaultTagRenderer<TText | TPhrasing> &
  DefaultRendererSpecs<HTMLContentModel.textual>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 */
export type CustomTextualRenderer = CustomTagRenderer<TText | TPhrasing> &
  Partial<CustomRendererSpecs<HTMLContentModel.textual>>;

export type DefaultMixedRenderer = DefaultTagRenderer<
  TBlock | TPhrasing | TText
> &
  DefaultRendererSpecs<HTMLContentModel.mixed>;

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 */
export type CustomMixedRenderer = CustomTagRenderer<
  TBlock | TPhrasing | TText
> &
  Partial<CustomRendererSpecs<HTMLContentModel.mixed>>;

export type CustomTagRendererFromModel<
  T extends HTMLContentModel
> = T extends HTMLContentModel.block
  ? CustomBlockRenderer
  : T extends HTMLContentModel.textual
  ? CustomTextualRenderer
  : T extends HTMLContentModel.mixed
  ? CustomMixedRenderer
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
