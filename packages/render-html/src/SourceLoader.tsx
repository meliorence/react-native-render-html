import React, { ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import isUriSource from './helpers/isUriSource';
import InlineSourceLoader from './InlineSourceLoader';
import { SourceLoaderProps } from './internal-types';
import { RenderHTMLProps } from './shared-types';
import UriSourceLoader from './UriSourceLoader';

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    fontStyle: 'italic',
    fontSize: 16
  }
});

function defaultRenderError(props: RenderHTMLProps) {
  return (
    <View style={styles.alignCenter}>
      <Text style={styles.errorText}>
        Failed to load HTML from{' '}
        {isUriSource(props.source) ? props.source.uri : 'unknown source'}
      </Text>
    </View>
  );
}

function defaultRenderLoading() {
  return (
    <View style={styles.alignCenter}>
      <ActivityIndicator />
    </View>
  );
}

export default function SourceLoader({
  source,
  ...props
}: SourceLoaderProps): ReactElement | null {
  if (!source) {
    return null;
  }
  if (isUriSource(source)) {
    return React.createElement(UriSourceLoader, { source, ...props });
  }
  return React.createElement(InlineSourceLoader, { source, ...props });
}

SourceLoader.defaultProps = {
  remoteErrorView: defaultRenderError,
  remoteLoadingView: defaultRenderLoading
};
