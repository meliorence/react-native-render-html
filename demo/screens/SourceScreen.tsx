import React from 'react';
import DisplayLoadingAtom from '../components/atoms/DisplayLoadingAtom';
import SourceDisplayMolecule from '../components/molecules/SourceDisplayMolecule';
import { useSelectedHTML } from '../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? <SourceDisplayMolecule html={html} /> : <DisplayLoadingAtom />;
}
