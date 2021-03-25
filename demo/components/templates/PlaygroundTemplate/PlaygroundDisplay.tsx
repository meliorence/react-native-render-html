import React, { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { RenderHTMLProps, TNode } from 'react-native-render-html';
import {
  PlaygroundInitParams,
  usePlaygroundSource,
  usePlaygroundState
} from './playgroundStore';
import { useThemeColors } from '../../../state/ThemeProvider';
import HtmlDisplayMolecule from '../../molecules/HtmlDisplayMolecule';
import BoxNucleon from '../../nucleons/BoxNucleon';
import { SheetProps } from './Sheet';
import sheetSnapPoints from './sheetSnapPoints';

export interface PlaygroundTemplateProps<Sk extends string>
  extends PlaygroundInitParams<Sk> {
  children: SheetProps['children'];
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: sheetSnapPoints[0]
  }
});

export default function PlaygroundDisplay({
  onTTreeChange
}: {
  onTTreeChange: (t: TNode) => void;
}) {
  const theme = useThemeColors();
  const html = usePlaygroundSource().source;
  const {
    fontFamily,
    fontSize,
    isItalic,
    isBold,
    lineHeight,
    olListType,
    ulListType
  } = usePlaygroundState();
  const renderHtmlProps: RenderHTMLProps = useMemo(
    () => ({
      baseStyle: {
        fontSize,
        lineHeight: lineHeight * fontSize,
        fontFamily,
        fontStyle: isItalic ? 'italic' : 'normal',
        fontWeight: isBold ? 'bold' : 'normal'
      },
      tagsStyles: {
        ul: {
          listStyleType: ulListType === 'default' ? null : ulListType
        },
        ol: {
          listStyleType: olListType === 'default' ? null : olListType
        }
      },
      source: { html },
      onTTreeChange,
      debug: true
    }),
    [
      fontSize,
      lineHeight,
      fontFamily,
      isItalic,
      isBold,
      olListType,
      html,
      onTTreeChange
    ]
  );
  const { width: contentWidth } = useWindowDimensions();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: theme.background
        }
      ]}>
      <BoxNucleon padding={0}>
        <HtmlDisplayMolecule
          renderHtmlProps={renderHtmlProps}
          useLegacy={false}
          supportsLegacy={false}
          contentWidth={contentWidth}
        />
      </BoxNucleon>
    </ScrollView>
  );
}
