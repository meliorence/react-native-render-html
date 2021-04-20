import React, { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { RenderHTMLProps, TNode } from 'react-native-render-html';
import {
  PlaygroundInitParams,
  usePlaygroundSource,
  usePlaygroundState
} from './playgroundStore';
import UIHtmlDisplayMolecule from '../../UIHtmlDisplayMolecule';
import BoxNucleon from '../../nucleons/BoxNucleon';
import { SheetProps } from './Sheet';
import sheetSnapPoints from './sheetSnapPoints';
import { useColorRoles } from '../../../theme/colorSystem';
import { useNuclearContentWidth } from '../../nucleons/useContentWidthContext';

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
  const html = usePlaygroundSource().source;
  const {
    fontFamily,
    fontSize,
    isItalic,
    isBold,
    lineHeight,
    olListType,
    ulListType,
    color
  } = usePlaygroundState();
  const fallbackColor = useColorRoles().surface.content;
  const renderHtmlProps: RenderHTMLProps = useMemo(
    () => ({
      baseStyle: {
        color: color ?? fallbackColor,
        fontSize,
        lineHeight: lineHeight * fontSize,
        fontFamily,
        fontStyle: isItalic ? 'italic' : 'normal',
        fontWeight: isBold ? 'bold' : 'normal'
      },
      tagsStyles: {
        ul: {
          listStyleType: ulListType === 'default' ? undefined : ulListType
        },
        ol: {
          listStyleType: olListType === 'default' ? undefined : olListType
        }
      },
      source: { html },
      onTTreeChange,
      debug: true
    }),
    [
      color,
      fallbackColor,
      fontSize,
      lineHeight,
      fontFamily,
      isItalic,
      isBold,
      ulListType,
      olListType,
      html,
      onTTreeChange
    ]
  );
  const contentWidth = useNuclearContentWidth();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BoxNucleon padding={0}>
        <UIHtmlDisplayMolecule
          renderHtmlProps={renderHtmlProps}
          useLegacy={false}
          supportsLegacy={false}
          contentWidth={contentWidth}
        />
      </BoxNucleon>
    </ScrollView>
  );
}
