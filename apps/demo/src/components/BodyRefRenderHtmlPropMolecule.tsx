import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import UIHyperlinkAtom from './UIHyperlinkAtom';
import { RefProps } from './nucleons/types';

export default function BodyRefRenderHtmlPropMolecule({
  name,
  ...props
}: RefProps<keyof RenderHTMLProps>) {
  return <UIHyperlinkAtom {...props}>{name}</UIHyperlinkAtom>;
}
