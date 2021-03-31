import { CSSProperties } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import normalizeStylesheet from './normalizeStylesheet';

type HljsStylsheet = Record<string, CSSProperties>;

export type HighlighterStylesheets = ReturnType<typeof createStylesheets>;

export default function createStylesheets(hljsStylesheet: HljsStylsheet) {
  const normalizedStyles = normalizeStylesheet(hljsStylesheet);
  const { backgroundColor, color } = normalizedStyles['hljs'];
  const containerStylesheet = StyleSheet.create({
    container: { backgroundColor: backgroundColor as string },
    text: { color }
  });
  const contentStylesheet = StyleSheet.create(
    normalizedStyles as Record<string, TextStyle>
  );
  return {
    containerStylesheet,
    contentStylesheet
  };
}
