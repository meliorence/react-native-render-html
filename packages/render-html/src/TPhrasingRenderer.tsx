import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-tree';
import { TNodeGenericRendererProps } from './TNodeRenderer';

const TPhrasingRenderer = ({
  tnode,
  key,
  renderTChildren,
  passedProps,
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TPhrasing>) => {
  return (
    <Text
      key={key}
      allowFontScaling={passedProps.allowFontScaling}
      selectable={passedProps.textSelectable}
      style={[
        tnode.styles.nativeBlockFlow,
        tnode.styles.nativeBlockRet,
        tnode.styles.nativeTextFlow,
        tnode.styles.nativeTextRet,
      ]}>
      {renderTChildren(tnode, { passedProps, syntheticAnchorOnLinkPress, marginCollapsingEnabled: false })}
    </Text>
  );
};

export default TPhrasingRenderer;
