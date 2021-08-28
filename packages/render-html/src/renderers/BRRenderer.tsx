import React from 'react';
import { Text } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const emptyProps = {
  testID: 'br'
};

const BRRenderer: InternalTextContentRenderer = function BRRenderer({
  renderIndex,
  renderLength,
  sharedProps
}) {
  // If it is the last child and BR collapsing is enabled, render nothing to
  // prevent inserting an undesired space and follow HTML specs.
  const shouldCollapse =
    sharedProps.enableExperimentalBRCollapsing &&
    renderIndex === renderLength - 1;
  return React.createElement(Text, emptyProps, shouldCollapse ? '' : '\n');
};

BRRenderer.isNativeInternalTextRenderer = true;

export default BRRenderer;
