import React, { useCallback } from 'react';
import { ScrollView, Linking, useWindowDimensions } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import LegacyHTML from 'rnrh-legacy';
import Constants from 'expo-constants';
import { TNode } from '@native-html/transient-render-engine';
import snippets, { SnippetId } from '../snippets';
import { useSetHTMLForSnippet, useSetTTreeForSnippet } from '../state/store';
import { useComponentColors } from '../state/ThemeProvider';
import DisplayLoading from './DisplayLoading';

const DEFAULT_PROPS: Pick<RenderHTMLProps, 'onLinkPress' | 'debug'> = {
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true
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
    exampleId,
    useLegacy = false
  }: {
    exampleId: SnippetId;
    useLegacy: boolean;
  }) => {
    const { width: contentWidth } = useWindowDimensions();
    const setHtmlForSnippet = useSetHTMLForSnippet();
    const setTTreeForSnippet = useSetTTreeForSnippet();
    const setHTML = useCallback(
      (html: string) => {
        setHtmlForSnippet(exampleId, html);
      },
      [setHtmlForSnippet, exampleId]
    );
    const setTTree = useCallback(
      (ttree: TNode) => {
        setTTreeForSnippet(exampleId, ttree);
      },
      [setTTreeForSnippet, exampleId]
    );
    const additionalProps = snippets[exampleId].props || {};
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
      html: snippets[exampleId].html,
      ...(additionalProps as any),
      textSelectable: true,
      renderers: {}
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
