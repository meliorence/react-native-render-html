import { DOMNode } from '@native-html/transient-render-engine';
import { RenderHTMLProps } from './shared-types';

export type ResolvedHtmlRendererProps = {
  html: string;
  baseUrl?: string;
} & Pick<RenderHTMLProps, 'tamperDOM'>;

export interface SourceLoaderProps
  extends Pick<
    RenderHTMLProps,
    | 'source'
    | 'remoteLoadingView'
    | 'remoteErrorView'
    | 'onHTMLLoaded'
    | 'tamperDOM'
  > {
  ResolvedHtmlRenderer: (resource: ResolvedHtmlRendererProps) => any;
}

export interface RenderDOMProps {
  dom: DOMNode;
  baseUrl?: string;
}

export type DOMProps = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded' | 'debug' | 'tamperDOM'
>;
