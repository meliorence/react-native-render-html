import React, { useContext, useEffect, useState } from 'react';
import { HTMLSourceUri } from './shared-types';
import { SourceLoaderProps } from './internal-types';
import RenderTTree from './RenderTTree';
import sourceLoaderContext from './context/sourceLoaderContext';

interface LoaderInternalState {
  error: boolean;
  resolvedHTML: string | null;
}

const ERROR_STATE = {
  error: true,
  resolvedHTML: null
};

async function loadHTMLResource(
  uri: string,
  { body, headers, method }: Omit<HTMLSourceUri, 'uri'>
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
      error: false
    };
  }
  return ERROR_STATE;
}

export type UriSourceLoaderProps = {
  source: HTMLSourceUri;
} & SourceLoaderProps;

function useUriSourceLoader({ source, onHTMLLoaded }: UriSourceLoaderProps) {
  const [loadState, setState] = useState<LoaderInternalState>({
    error: false,
    resolvedHTML: null
  });
  const { error } = loadState;

  // Effect to reload on uri changes
  useEffect(() => {
    let cancelled = false;
    if (!error) {
      setState({ error: false, resolvedHTML: null });
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

export default function SourceLoaderUri(props: UriSourceLoaderProps) {
  const { remoteErrorView, remoteLoadingView } =
    useContext(sourceLoaderContext);
  const { resolvedHTML, error } = useUriSourceLoader(props);
  if (error) {
    return remoteErrorView.call(null, props.source);
  }
  if (resolvedHTML === null) {
    return remoteLoadingView.call(null, props.source);
  }
  return React.createElement(RenderTTree, {
    document: resolvedHTML!,
    baseUrl: props.source.uri
  });
}
