import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Linking,
  useWindowDimensions
} from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useThemeColor } from '../components/Themed';
import snippets from './snippets';
import { CONTENT_PADDING_HZ } from './styles';

const CONTENT_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS: Partial<RenderHTMLProps> = {
  renderers: CUSTOM_RENDERERS,
  contentWidth: CONTENT_WIDTH,
  computeImagesMaxWidth(contentWidth: number) {
    return contentWidth - 40;
  },
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true
};

const Snippet = ({ exampleId }: { exampleId: keyof typeof snippets }) => {
  const { width: contentWidth } = useWindowDimensions();
  const additionalProps = snippets[exampleId].props || {};
  const baseStyle = {
    color: useThemeColor({}, 'text'),
    ...additionalProps.baseStyle
  };
  const renderHtml = (
    <RenderHTML
      {...DEFAULT_PROPS}
      contentWidth={contentWidth - CONTENT_PADDING_HZ * 2}
      html={snippets[exampleId].html}
      {...additionalProps}
      baseStyle={baseStyle}
      enableUserAgentStyles
      textSelectable
    />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10, alignSelf: 'stretch', backgroundColor: '#dbd9d3' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            color: useThemeColor({}, 'tint')
          }}>
          {snippets[exampleId].name}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>{renderHtml}</ScrollView>
    </SafeAreaView>
  );
};

export default Snippet;
