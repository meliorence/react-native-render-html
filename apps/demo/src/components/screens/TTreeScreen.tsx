import React from 'react';
import { useSelectedTTree } from '../../state/store';
import UIBidirectionalScrollViewAtom from '../UIBidirectionalScrollViewAtom';
import UIDisplayLoadingAtom from '../UIDisplayLoadingAtom';
import UITTreeDisplayMolecule from '../UITTreeDisplayMolecule';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <UIBidirectionalScrollViewAtom padding={5}>
      <UITTreeDisplayMolecule ttree={ttree} />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <UIDisplayLoadingAtom />
  );
}
