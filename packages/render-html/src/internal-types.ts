import { RenderHTMLProps } from './shared-types';

export type SourceLoaderProps = Pick<
  RenderHTMLProps,
  'source' | 'onHTMLLoaded'
>;

export interface RenderTTreeProps {
  html: string;
  baseUrl?: string;
}

export type TTreeEvents = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded'
>;
