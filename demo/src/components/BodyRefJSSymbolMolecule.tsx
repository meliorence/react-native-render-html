import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import BodyHyperlinkAtom from './BodyHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefJSSymbolMolecule({ name, ...props }: RefProps) {
  const onLinkPress = useOnLinkPress(`https://mdn.io/${name}`);
  return (
    <BodyHyperlinkAtom {...props} onPress={onLinkPress}>
      {name}
    </BodyHyperlinkAtom>
  );
}
