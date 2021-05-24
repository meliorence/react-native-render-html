import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import {
  CustomTagRenderer,
  InternalRenderer,
  PropsFromParent
} from '../shared-types';

/**
 * Special internal renderers for non-printable text (wbr, br).
 */
export type InternalTextContentRenderer = ComponentType<{
  key?: string | number;
}> & {
  isNativeInternalTextRenderer: true;
};

/**
 * Internal renderer for tags with a **block** content model.
 */
export type InternalBlockRenderer = InternalRenderer<TBlock>;

/**
 * Internal renderer for tags with a **mixed** content model.
 */
export type InternalMixedRenderer = InternalRenderer<
  TBlock | TPhrasing | TText
>;

/**
 * Internal renderer for tags with a **textual** content model.
 */
export type InternalTextualRenderer = InternalRenderer<TPhrasing | TText>;

/**
 * Block renderers can only render tnodes of type TBlock.
 */
export type CustomBlockRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TBlock, P>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 */
export type CustomTextualRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TText | TPhrasing, P>;

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 */
export type CustomMixedRenderer<
  P extends PropsFromParent = PropsFromParent
> = CustomTagRenderer<TBlock | TPhrasing | TText, P>;

/**
 * A record of custom renderers.
 */
export type CustomTagRendererRecord = Record<
  string,
  | CustomBlockRenderer<any>
  | CustomTextualRenderer<any>
  | CustomMixedRenderer<any>
>;
