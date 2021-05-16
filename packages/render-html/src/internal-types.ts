import { DOMDocument, DOMElement } from '@native-html/transient-render-engine';
import { RenderHTMLProps } from './shared-types';

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
