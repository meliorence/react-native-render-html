import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { TNodeSubRendererProps } from '../internal-types';
import { CustomRenderer, InternalRenderer } from '../shared-types';

/**
 * Special internal renderers for non-printable text (wbr, br).
 */
export type InternalTextContentRenderer = ComponentType<
  TNodeSubRendererProps<TText>
> & {
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
export type CustomBlockRenderer = CustomRenderer<TBlock>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 */
export type CustomTextualRenderer = CustomRenderer<TText | TPhrasing>;

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 */
export type CustomMixedRenderer = CustomRenderer<TBlock | TPhrasing | TText>;

/**
 * A record of custom renderers.
 */
export type CustomTagRendererRecord = Record<
  string,
  CustomBlockRenderer | CustomTextualRenderer | CustomMixedRenderer
>;
