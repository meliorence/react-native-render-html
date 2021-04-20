import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import contentWidthContextNucleon from './nucleons/contentWidthContextNucleon';
import { PropsWithStyle } from './nucleons/types';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';

export default function MaxWidthContainerAtom({
  children,
  style
}: PropsWithStyle<PropsWithChildren<{}>>) {
  const width = useNuclearContentWidth();
  const containerWidth = Math.min(width, 700);
  return (
    <contentWidthContextNucleon.Provider value={containerWidth}>
      <View style={[style, { width: containerWidth }]}>{children}</View>
    </contentWidthContextNucleon.Provider>
  );
}
