import { TNode } from '@native-html/transient-render-engine';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { InternalTextContentRenderer } from '../render/render-types';

const emptyProps = {
  testID: 'br'
};

const isWeb = Platform.OS === 'web';

function renderEmptyLineBreak(tnode: TNode) {
  const lineHeight =
    tnode.styles.nativeTextFlow.lineHeight ||
    tnode.styles.nativeTextFlow.fontSize! * 1.4;
  return <View style={{ height: lineHeight }} />;
}

const BRRenderer: InternalTextContentRenderer = function BRRenderer({
  renderIndex,
  renderLength,
  sharedProps,
  tnode
}) {
  // If it is the last child and BR collapsing is enabled, render an empty
  // string to prevent inserting an undesired space to follow HTML specs,
  // unless the platform is web and it is also the first child.
  //
  // Note that we are taking advantage of the Ghost Line oddity in React
  // Native, where an empty <Text /> element displays a line, since a
  // line break opening **and** closing an inline formatting context
  // should be printed as a one line-height item.
  const isFirst = renderIndex === 0;
  const isLast = renderIndex === renderLength - 1;
  const isLonelyBreak = isFirst && isLast;
  const shouldCollapse =
    sharedProps.enableExperimentalBRCollapsing &&
    (isFirst ? isLast && !isWeb : isLast);
  return isLonelyBreak && shouldCollapse
    ? renderEmptyLineBreak(tnode)
    : React.createElement(Text, emptyProps, shouldCollapse ? '' : '\n');
};

BRRenderer.isNativeInternalTextRenderer = true;

export default BRRenderer;
