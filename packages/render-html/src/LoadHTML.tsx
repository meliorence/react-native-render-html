import React, { ReactElement, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RenderHTMLProps } from './shared-types';

interface HTMLLoaderProps extends RenderHTMLProps {
  children: (resolvedHTML: string) => ReactElement;
}

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

async function loadHTMLResource(uri: string): Promise<LoaderInternalState> {
  const response = await fetch(uri);
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

function useLoader(props: HTMLLoaderProps) {
  const { uri, html, onHTMLLoaded } = props;
  const [loadState, setState] = useState<LoaderInternalState>({
    error: false,
    loading: false,
    resolvedHTML: html || null
  });
  const { error } = loadState;
  useEffect(() => {
    let cancelled = false;
    if (!error && uri) {
      setState({ loading: true, error: false, resolvedHTML: null });
      loadHTMLResource(uri)
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
  }, [error, uri]);
  useEffect(() => {
    loadState.resolvedHTML && onHTMLLoaded?.call(null, loadState.resolvedHTML);
  }, [loadState.resolvedHTML, onHTMLLoaded]);
  return loadState;
}

function defaultRenderError(props: RenderHTMLProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontStyle: 'italic', fontSize: 16 }}>
        Failed to load {props.uri}
      </Text>
    </View>
  );
}

function defaultRenderLoading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
export default function LoadHTML(props: HTMLLoaderProps): ReactElement | null {
  const { remoteErrorView, remoteLoadingView, children } = props;
  const { resolvedHTML, error, loading } = useLoader(props);
  if (error) {
    return remoteErrorView!.call(null, props);
  }
  if (loading) {
    return remoteLoadingView!.call(null, props);
  }
  return children?.call(null, resolvedHTML!) || null;
}

LoadHTML.defaultProps = {
  remoteErrorView: defaultRenderError,
  remoteLoadingView: defaultRenderLoading
};
