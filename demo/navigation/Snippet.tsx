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

function toLegacyBaseFontStyles(baseStyles: Record<string, any>) {
  return Object.keys(baseStyles)
    .filter((k) => k != 'whiteSpace' && k != 'listStyleType')
    .reduce((container, key) => ({ ...container, [key]: baseStyles[key] }), {});
}

const Snippet = ({
  exampleId,
  useLegacy = false
}: {
  exampleId: keyof typeof snippets;
  useLegacy: boolean;
}) => {
  const { width: contentWidth } = useWindowDimensions();
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

  const renderHtml = useLegacy ? (
    <LegacyHTML
      {...sharedProps}
      html={sharedProps.html}
      baseFontStyle={toLegacyBaseFontStyles(baseStyle)}
      debug={false}
    />
  ) : (
    <RenderHTML {...sharedProps} baseStyle={baseStyle} enableUserAgentStyles />
  );
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 10 }}
      style={{ flexGrow: 1 }}>
      {renderHtml}
    </ScrollView>
  );
};

export default Snippet;
