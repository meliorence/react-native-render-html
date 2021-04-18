import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import BodyHyperlinkAtom from './BodyHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefHtmlAttrMolecule(props: RefProps) {
  // TODO enhance this by parsing this page and generating a linkmap in a
  // buildstep: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  const onLinkPress = useOnLinkPress(`https://mdn.io/attribute/${props.name}`);
  return (
    <BodyHyperlinkAtom onPress={onLinkPress} {...props} children={props.name} />
  );
}
