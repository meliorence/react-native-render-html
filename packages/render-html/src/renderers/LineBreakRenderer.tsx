import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const LineBreakRenderer: InternalTextContentRenderer = function LineBreakRenderer({
  key
}) {
  return <Text key={key}>{'\n'}</Text>;
};

LineBreakRenderer.isNativeInternalTextRenderer = true;

export default LineBreakRenderer;
