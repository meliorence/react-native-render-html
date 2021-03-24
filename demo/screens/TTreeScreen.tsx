import React from 'react';
import { tnodeToString } from '@native-html/transient-render-engine';
import BidirectionalScrollView from '../components/BidirectionalScrollView';
import { useSelectedTTree } from '../state/store';
import DisplayLoading from '../components/DisplayLoading';
import AtomicText from '../components/AtomicText';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <BidirectionalScrollView padding={5}>
      <AtomicText mono style={{ fontSize: 12 }}>
        {ttree && tnodeToString(ttree)}
      </AtomicText>
    </BidirectionalScrollView>
  ) : (
    <DisplayLoading />
  );
}
