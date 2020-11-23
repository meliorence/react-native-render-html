import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { useTChildrenRenderer } from './context/TNodeRenderersContext';
import { TNodeGenericRendererProps } from './shared-types';

const TPhrasingRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  syntheticAnchorOnLinkPress
}: TNodeGenericRendererProps<TPhrasing>) => {
  const { allowFontScaling, textSelectable } = useSharedProps();
  const TChildrenRenderer = useTChildrenRenderer();
  return (
    <Text
      key={key}
      allowFontScaling={allowFontScaling}
      selectable={textSelectable}
      onPress={syntheticAnchorOnLinkPress}
      style={[
        tnode.styles.nativeBlockFlow,
        tnode.styles.nativeBlockRet,
        tnode.styles.nativeTextFlow,
        tnode.styles.nativeTextRet
      ]}>
      <TChildrenRenderer
        tnode={tnode}
        disableMarginCollapsing={true}
        hasAnchorAncestor={hasAnchorAncestor}
      />
    </Text>
  );
};

export default TPhrasingRenderer;
