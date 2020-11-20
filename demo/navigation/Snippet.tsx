import React from 'react';
import {
  ScrollView,
  Dimensions,
  Linking,
  useWindowDimensions
} from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import LegacyHTML from 'rnrh-legacy';
import { useThemeColor } from '../components/Themed';
import { useTTree } from '../state/TTreeContextProvider';
import snippets from './snippets';
import { CONTENT_PADDING_HZ } from './styles';

const CONTENT_WIDTH = Dimensions.get('window').width - 50;
const DEFAULT_PROPS: Pick<
  RenderHTMLProps,
  'contentWidth' | 'computeImagesMaxWidth' | 'onLinkPress' | 'debug'
> = {
  contentWidth: CONTENT_WIDTH,
  computeImagesMaxWidth(contentWidth: number) {
    return contentWidth - 40;
  },
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

const Snippet = React.memo(({
  exampleId,
  useLegacy = false
}: {
  exampleId: keyof typeof snippets;
  useLegacy: boolean;
}) => {
  const { width: contentWidth } = useWindowDimensions();
  const { setTTree } = useTTree();
  const additionalProps = snippets[exampleId].props || {};
  const baseStyle = {
    color: useThemeColor({}, 'text'),
    ...additionalProps.baseStyle
  };
  const sharedProps = {
    ...DEFAULT_PROPS,
    contentWidth: contentWidth - CONTENT_PADDING_HZ * 2,
    html: snippets[exampleId].html,
    ...(additionalProps as any),
    textSelectable: true,
    renderers: {}
  };
  const mergedTagsStyles = {
    ...sharedProps.tagsStyles,
    hr: { marginTop: 16, marginBottom: 16, ...sharedProps.tagsStyles?.hr, height: 1, backgroundColor: '#CCC' }
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
      onTTreeChange={setTTree}
      debug={true}
      enableExperimentalMarginCollapsing={false}
    />
  );
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 10 }}
      style={{ flexGrow: 1 }}>
      {renderHtml}
    </ScrollView>
  );
});

export default Snippet;
