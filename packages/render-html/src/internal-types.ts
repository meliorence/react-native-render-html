import { RenderHTMLProps } from './shared-types';

export interface ResolvedResourceProps {
  html: string;
  baseUrl?: string;
}

export interface SourceLoaderProps
  extends Pick<
    RenderHTMLProps,
    'source' | 'remoteLoadingView' | 'remoteErrorView' | 'onHTMLLoaded'
  > {
  children: (resource: ResolvedResourceProps) => any;
}

export type RenderResolvedHTMLProps = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded' | 'debug'
> & {
  html: string;
  baseUrl?: string;
};
