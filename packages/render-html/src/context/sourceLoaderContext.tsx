import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RenderHTMLConfig, RenderHTMLSourceUri } from '../shared-types';

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

function defaultRenderError(source: RenderHTMLSourceUri) {
  return (
    <View style={styles.alignCenter}>
      <Text style={styles.errorText}>
        Failed to load HTML from {source.uri}
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

const sourceLoaderContext = React.createContext<
  Pick<RenderHTMLConfig, 'remoteErrorView' | 'remoteLoadingView'>
>({
  remoteErrorView: defaultRenderError,
  remoteLoadingView: defaultRenderLoading
});

export default sourceLoaderContext;
