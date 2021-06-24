import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const emptyProps = {};

const WBRRenderer: InternalTextContentRenderer = function WordBreakRenderer() {
  return React.createElement(Text, emptyProps, '\u200b');
};

WBRRenderer.isNativeInternalTextRenderer = true;

export default WBRRenderer;
