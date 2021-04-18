import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import UIHyperlinkAtom from './UIHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefHtmlElementMolecule({
  name,
  ...props
}: RefProps) {
  const onLinkPress = useOnLinkPress(`https://mdn.io/${name}`);
  return (
    <UIHyperlinkAtom {...props} onPress={onLinkPress}>
      &lt;{name}&gt;
    </UIHyperlinkAtom>
  );
}
