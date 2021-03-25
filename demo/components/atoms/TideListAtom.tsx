import React from 'react';
import { Stack, useSpacing } from '@mobily/stacks';
import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import BoxNucleon from '../nucleons/BoxNucleon';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import contentWidthContextNucleon from '../nucleons/contentWidthContextNucleon';

export default function TideListAtom({
  children,
  spaces = 0,
  style
}: PropsWithChildren<{ style?: StyleProp<ViewStyle>; spaces?: number }>) {
  const contentWidth = useNuclearContentWidth();
  const controlContentWidth = contentWidth - useSpacing(2 * spaces);
  return (
    <contentWidthContextNucleon.Provider value={controlContentWidth}>
      <BoxNucleon style={style} paddingX={spaces}>
        <Stack space={4}>{children}</Stack>
      </BoxNucleon>
    </contentWidthContextNucleon.Provider>
  );
}
