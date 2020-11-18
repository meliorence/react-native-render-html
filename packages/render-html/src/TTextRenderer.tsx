import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-tree';
import { TNodeGenericRendererProps } from './TNodeRenderer';

const TTextRenderer = ({
  tnode,
  key,
  defaultRenderers,
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TText>) => {
  const defaultRenderer = defaultRenderers.text[tnode.tagName as any];
  const data = defaultRenderer ? defaultRenderer() : tnode.data;
  return (
    <Text
      key={key}
      onPress={syntheticAnchorOnLinkPress}
      style={[
        tnode.styles.nativeBlockFlow,
        tnode.styles.nativeBlockRet,
        tnode.styles.nativeTextFlow,
        tnode.styles.nativeTextRet
      ]}>
      {data}
    </Text>
  );
};

export default TTextRenderer;
