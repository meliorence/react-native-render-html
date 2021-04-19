import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import UIHyperlinkAtom from './UIHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefCssPropertyMolecule(props: RefProps) {
  const onLinkPress = useOnLinkPress(`https://mdn.io/${props.name}`);
  return (
    <UIHyperlinkAtom onPress={onLinkPress} {...props} children={props.name} />
  );
}
