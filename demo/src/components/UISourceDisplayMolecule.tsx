import { useSpacing } from '@mobily/stacks';
import React, { useCallback } from 'react';
import Highlighter, { HighlighterProps } from '../highlight/Highlighter';
import { useColorScheme } from '../state/ColorSchemeProvider';
import { useColorPrimitives } from '../theme/colorSystem';
import useTextRoleNucleon, {
  TextRoleNucleonProps
} from './nucleons/useTextRoleNucleon';

export interface SourceRenderer {
  htmlSource: string;
}

export type UISourceDisplayMoleculeProps = {
  content: string;
  style?: HighlighterProps['style'];
  language?: HighlighterProps['language'];
  paddingVertical?: number;
  clipLines?: boolean;
  textRole?: TextRoleNucleonProps['role'];
} & Omit<
  HighlighterProps,
  | 'paddingTop'
  | 'paddingBottom'
  | 'lineStyle'
  | 'lineNumberStyle'
  | 'highlightJsStyle'
  | 'fontSize'
  | 'lineFontSize'
  | 'fontFamily'
>;

export default function UISourceDisplayMolecule({
  paddingVertical,
  textRole = 'source',
  showLineNumbers = true,
  ...otherProps
}: UISourceDisplayMoleculeProps) {
  const { card } = useColorPrimitives();
  const spacing = useSpacing(2);
  const colorScheme = useColorScheme();
  const { fontFamily, fontSize } = useTextRoleNucleon({
    role: textRole
  });
  const syntheticPaddingVertical = useSpacing(paddingVertical ?? 0);
  const lineNumberDisplayWidthComputer: HighlighterProps['lineNumberDisplayWidthComputer'] = useCallback(
    (fs, maxLineNumberCharLength) => spacing + fs * maxLineNumberCharLength,
    [spacing]
  );
  return (
    <Highlighter
      {...otherProps}
      highlightJsStyle={
        colorScheme === 'dark' ? 'solarizedDark' : 'solarizedLight'
      }
      fontSize={fontSize}
      fontFamily={fontFamily}
      lineStyle={{
        paddingHorizontal: spacing
      }}
      lineNumberStyle={{
        backgroundColor: card.color,
        color: card.content
      }}
      paddingBottom={syntheticPaddingVertical}
      paddingTop={syntheticPaddingVertical}
      lineNumberDisplayWidthComputer={lineNumberDisplayWidthComputer}
      showLineNumbers={showLineNumbers}
    />
  );
}
