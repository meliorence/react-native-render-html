import { RenderHTMLProps } from './shared-types';

export type SourceLoaderProps = Pick<
  RenderHTMLProps,
  'source' | 'remoteLoadingView' | 'remoteErrorView' | 'onHTMLLoaded'
>;

export interface RenderTTreeProps {
  html: string;
  baseUrl?: string;
}

export type DOMProps = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded' | 'debug'
>;
