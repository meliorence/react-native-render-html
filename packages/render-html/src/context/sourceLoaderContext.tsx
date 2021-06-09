import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RenderHTMLConfig, HTMLSourceUri } from '../shared-types';

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

export function defaultRenderError(source: HTMLSourceUri) {
  return (
    <View testID="loader-error" style={styles.alignCenter}>
      <Text style={styles.errorText}>
        Failed to load HTML from {source.uri}
      </Text>
    </View>
  );
}

export function defaultRenderLoading() {
  return (
    <View testID="loader-loading" style={styles.alignCenter}>
      <ActivityIndicator />
    </View>
  );
}

const sourceLoaderContext = React.createContext<
  Pick<Required<RenderHTMLConfig>, 'remoteErrorView' | 'remoteLoadingView'>
>({
  remoteErrorView: defaultRenderError,
  remoteLoadingView: defaultRenderLoading
});

export default sourceLoaderContext;
