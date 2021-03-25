import React from 'react';
import { useSelectedTTree } from '../state/store';
import BidirectionalScrollViewAtom from '../components/atoms/BidirectionalScrollViewAtom';
import DisplayLoadingAtom from '../components/atoms/DisplayLoadingAtom';
import TTreeDisplayMolecule from '../components/molecules/TTreeDisplayMolecule';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <BidirectionalScrollViewAtom padding={5}>
      <TTreeDisplayMolecule ttree={ttree} />
    </BidirectionalScrollViewAtom>
  ) : (
    <DisplayLoadingAtom />
  );
}
