import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-tree';
import { useSharedProps } from './context/SharedPropsContext';
import { useTChildrenRenderer } from './context/TNodeRenderersContext';
import { TNodeGenericRendererProps } from './types';

const TPhrasingRenderer = ({
  tnode,
  key,
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TPhrasing>) => {
  const { allowFontScaling, textSelectable } = useSharedProps();
  const TChildrenRenderer = useTChildrenRenderer();
  return (
    <Text
      key={key}
      allowFontScaling={allowFontScaling}
      selectable={textSelectable}
      style={[
        tnode.styles.nativeBlockFlow,
        tnode.styles.nativeBlockRet,
        tnode.styles.nativeTextFlow,
        tnode.styles.nativeTextRet
      ]}>
      <TChildrenRenderer
        tnode={tnode}
        disableMarginCollapsing={true}
        syntheticAnchorOnLinkPress={syntheticAnchorOnLinkPress}
      />
    </Text>
  );
};

export default TPhrasingRenderer;
