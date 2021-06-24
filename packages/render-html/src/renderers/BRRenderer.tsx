import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const emptyProps = {};

const BRRenderer: InternalTextContentRenderer = function BRRenderer() {
  return React.createElement(Text, emptyProps, '\n');
};

BRRenderer.isNativeInternalTextRenderer = true;

export default BRRenderer;
