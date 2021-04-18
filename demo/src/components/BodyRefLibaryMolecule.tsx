import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import UIHyperlinkAtom from './UIHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefLibraryMolecule({
  name,
  url,
  ...props
}: RefProps & { url: string }) {
  const onLinkPress = useOnLinkPress(url);
  return (
    <UIHyperlinkAtom {...props} onPress={onLinkPress}>
      {name}
    </UIHyperlinkAtom>
  );
}
