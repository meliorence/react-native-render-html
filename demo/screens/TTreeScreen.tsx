import React from 'react';
import { tnodeToString } from '@native-html/transient-render-engine';
import BidirectionalScrollView from '../components/BidirectionalScrollView';
import { MonoText } from '../components/StyledText';
import { useTTree } from '../state/TTreeContextProvider';

export default function TTreeScreen() {
  const { ttree } = useTTree();
  return (
    <BidirectionalScrollView padding={5}>
      <MonoText style={{ fontSize: 12 }}>
        {ttree && tnodeToString(ttree)}
      </MonoText>
    </BidirectionalScrollView>
  );
}
