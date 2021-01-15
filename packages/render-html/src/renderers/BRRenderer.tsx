import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const BRRenderer: InternalTextContentRenderer = function BRRenderer({ key }) {
  return <Text key={key}>{'\n'}</Text>;
};

BRRenderer.isNativeInternalTextRenderer = true;

export default BRRenderer;
