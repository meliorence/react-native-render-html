import React from 'react';
import { ScrollView, Linking, useWindowDimensions } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import LegacyHTML from 'rnrh-legacy';
import Constants from 'expo-constants';
import { useThemeColor } from './Themed';
import snippets from '../snippets';
import { useTTree } from '../state/TTreeContextProvider';
import { useLoadedHTML } from '../state/LoadedHTMLContext';

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
    exampleId: keyof typeof snippets;
    useLegacy: boolean;
  }) => {
    const { width: contentWidth } = useWindowDimensions();
    const { setTTree } = useTTree();
    const { setHTML } = useLoadedHTML();
    const additionalProps = snippets[exampleId].props || {};
    const baseStyle = {
      color: useThemeColor({}, 'text'),
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
        backgroundColor: '#CCC'
      },
      html: {}
    };
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
        systemFonts={Constants.systemFonts}
        onTTreeChange={setTTree}
        onHTMLLoaded={setHTML}
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
