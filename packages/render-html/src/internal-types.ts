import { TNode } from '@native-html/transient-render-engine';
import { DOMDocument, DOMElement } from '@native-html/transient-render-engine';
import {
  RenderHTMLProps,
  TNodeRendererProps,
  RenderHTMLSharedProps
} from './shared-types';

export type SourceLoaderProps = Pick<
  RenderHTMLProps,
  'source' | 'onHTMLLoaded'
>;

export interface RenderTTreeProps {
  document: string | DOMElement | DOMDocument;
  baseUrl?: string;
}

export type TTreeEvents = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded'
>;

export interface TNodeSubRendererProps<T extends TNode>
  extends TNodeRendererProps<T> {
  /**
   * Props shared across the whole render tree.
   */
  sharedProps: Required<RenderHTMLSharedProps>;
}
