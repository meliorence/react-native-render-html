import React, { useEffect } from 'react';
import { SourceLoaderProps } from './internal-types';
import RenderTTree from './RenderTTree';
import { HTMLSourceInline } from './shared-types';

export type InlineSourceLoaderProps = {
  source: HTMLSourceInline;
} & SourceLoaderProps;

function useInlineSourceLoader({
  source,
  onHTMLLoaded
}: InlineSourceLoaderProps) {
  const html = source.html;
  useEffect(() => {
    html && onHTMLLoaded?.call(null, html);
  }, [html, onHTMLLoaded]);
  return source;
}

export default function SourceLoaderInline(props: InlineSourceLoaderProps) {
  const { html } = useInlineSourceLoader(props);
  return React.createElement(RenderTTree, {
    document: html,
    baseUrl: props.source.baseUrl
  });
}
