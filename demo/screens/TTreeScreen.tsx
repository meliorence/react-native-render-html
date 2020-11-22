import React from 'react';
import { tnodeToString } from '@native-html/transient-render-engine';
import BidirectionalScrollView from '../components/BidirectionalScrollView';
import MonoText from '../components/MonoText';
import { useSelectedTTree } from '../state/store';
import DisplayLoading from '../components/DisplayLoading';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <BidirectionalScrollView padding={5}>
      <MonoText style={{ fontSize: 12 }}>
        {ttree && tnodeToString(ttree)}
      </MonoText>
    </BidirectionalScrollView>
  ) : (
    <DisplayLoading />
  );
}
