import { useEffect, useState } from 'react';
import { RenderHTMLSourceUri, SourceLoaderProps } from './shared-types';

interface LoaderInternalState {
  loading: boolean;
  error: boolean;
  resolvedHTML: string | null;
}

const ERROR_STATE = {
  error: true,
  loading: false,
  resolvedHTML: null
};

async function loadHTMLResource(
  uri: string,
  { body, headers, method }: Omit<RenderHTMLSourceUri, 'uri'>
): Promise<LoaderInternalState> {
  const response = await fetch(uri, {
    body,
    headers,
    method
  });
  if (response.ok) {
    const html = await response.text();
    return {
      resolvedHTML: html,
      error: false,
      loading: false
    };
  }
  return ERROR_STATE;
}

export type UriSourceLoaderProps = {
  source: RenderHTMLSourceUri;
} & SourceLoaderProps;

function useUriSourceLoader({ source, onHTMLLoaded }: UriSourceLoaderProps) {
  const [loadState, setState] = useState<LoaderInternalState>({
    error: false,
    loading: false,
    resolvedHTML: null
  });
  const { error } = loadState;

  // Effect to reload on uri changes
  useEffect(() => {
    let cancelled = false;
    if (!error) {
      setState({ loading: true, error: false, resolvedHTML: null });
      loadHTMLResource(source.uri, {
        body: source.body,
        headers: source.headers,
        method: source.method
      })
        .then((state) => {
          !cancelled && setState(state);
        })
        .catch(() => {
          !cancelled && setState(ERROR_STATE);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [error, source.uri, source.body, source.headers, source.method]);
  useEffect(() => {
    loadState.resolvedHTML && onHTMLLoaded?.call(null, loadState.resolvedHTML);
  }, [loadState.resolvedHTML, onHTMLLoaded]);
  return loadState;
}

export default function UriSourceLoader(props: UriSourceLoaderProps) {
  const { remoteErrorView, remoteLoadingView, children } = props;
  const { resolvedHTML, error, loading } = useUriSourceLoader(props);
  if (error) {
    return remoteErrorView!.call(null, props);
  }
  if (loading) {
    return remoteLoadingView!.call(null, props);
  }
  return children?.call(null, resolvedHTML!) || null;
}
