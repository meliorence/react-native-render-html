import React from 'react';
import UIBidirectionalScrollViewAtom from '../UIBidirectionalScrollViewAtom';
import UIDisplayLoadingAtom from '../UIDisplayLoadingAtom';
import UISourceDisplayMolecule from '../UISourceDisplayMolecule';
import { useSelectedHTML } from '../../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? (
    <UIBidirectionalScrollViewAtom>
      <UISourceDisplayMolecule
        language="html"
        paddingVertical={2}
        content={html}
      />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <UIDisplayLoadingAtom />
  );
}
