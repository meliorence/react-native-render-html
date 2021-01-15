import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const WBRRenderer: InternalTextContentRenderer = function WordBreakRenderer({
  key
}) {
  return <Text key={key}>{'\u200b'}</Text>;
};

WBRRenderer.isNativeInternalTextRenderer = true;

export default WBRRenderer;
