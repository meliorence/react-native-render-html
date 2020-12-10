import { useEffect } from 'react';
import { RenderHTMLSourceInline, SourceLoaderProps } from './shared-types';

export type InlineSourceLoaderProps = {
  source: RenderHTMLSourceInline;
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

export default function InlineSourceLoader(props: InlineSourceLoaderProps) {
  const { children } = props;
  const { html } = useInlineSourceLoader(props);
  return children?.call(null, html) || null;
}
