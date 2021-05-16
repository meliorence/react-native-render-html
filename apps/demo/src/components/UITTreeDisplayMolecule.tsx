import React, { useMemo } from 'react';
import { TNode } from 'react-native-render-html';
import { HighlighterProps } from '../highlight/Highlighter';
import { TextRoleNucleonProps } from './nucleons/TextRoleNucleon';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';

export default function UITTreeDisplayMolecule({
  ttree,
  ...props
}: {
  ttree?: TNode;
  style?: HighlighterProps['style'];
  language?: HighlighterProps['language'];
  paddingVertical?: number;
  clipLines?: boolean;
  textRole?: TextRoleNucleonProps['role'];
}) {
  const xml = useMemo(() => ttree?.snapshot(), [ttree]);
  return xml ? (
    <UISourceDisplayMolecule
      showLineNumbers={false}
      language="xml"
      content={xml}
      {...props}
    />
  ) : null;
}
