import React, { useCallback } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useLegacyMode } from '../state/store';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { TNode } from '@native-html/transient-render-engine';
import snippets, { SnippetId } from '../snippets';
import { useSetHTMLForSnippet, useSetTTreeForSnippet } from '../state/store';
import HtmlDisplayMolecule from '../components/molecules/HtmlDisplayMolecule';

const CONTAINER_PADDING = 10;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: CONTAINER_PADDING
  },
  container: { flexGrow: 1 }
});

const Snippet = React.memo(
  ({
    snippetId,
    useLegacy = false
  }: {
    snippetId: SnippetId;
    useLegacy: boolean;
  }) => {
    const { width: contentWidth } = useWindowDimensions();
    const setHtmlForSnippet = useSetHTMLForSnippet();
    const setTTreeForSnippet = useSetTTreeForSnippet();
    const setHTML = useCallback(
      (html: string) => {
        setHtmlForSnippet(snippetId, html);
      },
      [setHtmlForSnippet, snippetId]
    );
    const setTTree = useCallback(
      (ttree: TNode) => {
        setTTreeForSnippet(snippetId, ttree);
      },
      [setTTreeForSnippet, snippetId]
    );
    const snippetProps = snippets[snippetId].props || {};
    const supportsLegacy = snippets[snippetId].supportsLegacy;

    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <HtmlDisplayMolecule
          contentWidth={contentWidth - CONTAINER_PADDING * 2}
          useLegacy={useLegacy}
          supportsLegacy={supportsLegacy}
          renderHtmlProps={{
            ...(snippetProps as any),
            onHTMLLoaded: setHTML,
            onTTreeChange: setTTree
          }}
        />
      </ScrollView>
    );
  }
);

export default function SnippetScreen({ route }: DrawerScreenProps<any>) {
  const legacyMode = useLegacyMode();
  const { snippetId } = route.params as any;
  return <Snippet useLegacy={legacyMode} snippetId={snippetId} />;
}
