import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  useWindowDimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import EXAMPLES, * as snippets from './snippets';
import styles, {CONTENT_PADDING_HZ} from './styles';

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  computeImagesMaxWidth(contentWidth) {
    return contentWidth - 40;
  },
  onLinkPress(evt, href) {
    Linking.openURL(href);
  },
  debug: true,
};

const ExamplesList = ({onCurrentExampleChange}) => {
  const examples = Object.keys(EXAMPLES).map((snippetId, index) => {
    return (
      <TouchableOpacity
        key={`example-btn-${index}`}
        onPress={() => onCurrentExampleChange(snippetId)}
        style={styles.exampleBtn}>
        <Text style={styles.exampleBtnLabel}>{EXAMPLES[snippetId].name}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <ScrollView
      horizontal={true}
      style={styles.examplesListContainer}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {examples}
    </ScrollView>
  );
};

const Demo = () => {
  const [currentExample, setCurrentExample] = useState('paragraphs');
  const {width: contentWidth} = useWindowDimensions();
  const additionalProps = EXAMPLES[currentExample].props || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>react-native-render-html</Text>
      <ExamplesList onCurrentExampleChange={setCurrentExample} />
      <ScrollView style={{flex: 1}}>
        <HTML
          {...DEFAULT_PROPS}
          contentWidth={contentWidth - CONTENT_PADDING_HZ * 2}
          html={snippets[currentExample]}
          {...additionalProps}
        />
      </ScrollView>
    </View>
  );
};

export default Demo;