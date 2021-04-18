import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import BodyHyperlinkAtom from './BodyHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefRenderHtmlPropMolecule({
  name,
  ...props
}: RefProps<keyof RenderHTMLProps>) {
  return <BodyHyperlinkAtom {...props}>{name}</BodyHyperlinkAtom>;
}
