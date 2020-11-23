import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const WordBreakRenderer: InternalTextContentRenderer = function WordBreakRenderer({
  key
}) {
  return <Text key={key}>{'\u200b'}</Text>;
};

WordBreakRenderer.isNativeInternalTextRenderer = true;

export default WordBreakRenderer;
