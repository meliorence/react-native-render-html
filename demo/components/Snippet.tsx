import React, { useCallback } from 'react';
import { ScrollView, Linking, useWindowDimensions, View } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import LegacyHTML from 'rnrh-legacy';
import Constants from 'expo-constants';
import { TNode } from '@native-html/transient-render-engine';
import snippets, { SnippetId } from '../snippets';
import { useSetHTMLForSnippet, useSetTTreeForSnippet } from '../state/store';
import { useComponentColors } from '../state/ThemeProvider';
import DisplayLoading from './DisplayLoading';
import Text from './Text';

const DEFAULT_PROPS: Pick<
  RenderHTMLProps,
  'onLinkPress' | 'debug' | 'enableExperimentalPercentWidth'
> = {
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true,
  enableExperimentalPercentWidth: true
};

function stripUnsupportedStylesInLegacy(style: Record<string, any>) {
  return Object.keys(style)
    .filter((k) => k != 'whiteSpace' && k != 'listStyleType')
    .reduce((container, key) => ({ ...container, [key]: style[key] }), {});
}

function stripPropsFromStylesheet(
  styleSheet?: Record<string, Record<string, any>>
) {
  if (!styleSheet) {
    return undefined;
  }
  return Object.entries(styleSheet).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]: stripUnsupportedStylesInLegacy(value)
    }),
    {} as Record<string, any>
  );
}

const CONTAINER_PADDING = 10;

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
    const additionalProps = snippets[snippetId].props || {};
    const {
      html: { color, backgroundColor, border }
    } = useComponentColors();
    const baseStyle = {
      color,
      backgroundColor,
      ...additionalProps.baseStyle
    };
    const sharedProps = {
      ...DEFAULT_PROPS,
      contentWidth: contentWidth - CONTAINER_PADDING * 2,
      html: snippets[snippetId].html,
      ...(additionalProps as any),
      textSelectable: true
    };
    const mergedTagsStyles = {
      ...sharedProps.tagsStyles,
      hr: {
        marginTop: 16,
        marginBottom: 16,
        ...sharedProps.tagsStyles?.hr,
        height: 1,
        backgroundColor: border
      },
      html: {}
    };
    const systemFonts = React.useMemo(
      () => [...Constants.systemFonts, 'space-mono'],
      []
    );

    if (
      (snippetId === 'customRenderers' || snippetId === 'customTags') &&
      useLegacy
    ) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 30,
            flexGrow: 1
          }}>
          <Text
            style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic' }}>
            Legacy HTML component is not available for this snippet.
          </Text>
        </View>
      );
    }

    const renderHtml = useLegacy ? (
      <LegacyHTML
        {...sharedProps}
        html={sharedProps.html}
        baseFontStyle={stripUnsupportedStylesInLegacy(baseStyle)}
        classesStyles={stripPropsFromStylesheet(sharedProps.classesStyles)}
        tagsStyles={stripPropsFromStylesheet(mergedTagsStyles)}
        debug={false}
      />
    ) : (
      <RenderHTML
        {...sharedProps}
        tagsStyles={mergedTagsStyles}
        baseStyle={baseStyle}
        enableUserAgentStyles
        enableExperimentalMarginCollapsing={true}
        debug={false}
        systemFonts={systemFonts}
        onTTreeChange={setTTree}
        onHTMLLoaded={setHTML}
        remoteLoadingView={() => <DisplayLoading />}
        triggerTREInvalidationPropNames={['baseStyle']}
      />
    );
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: CONTAINER_PADDING
        }}
        style={{ flexGrow: 1 }}>
        {renderHtml}
      </ScrollView>
    );
  }
);

export default Snippet;
