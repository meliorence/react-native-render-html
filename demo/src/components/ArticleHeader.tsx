import React from 'react';
import { Stack, StackProps } from '@mobily/stacks';
import { PropsWithStyle } from './nucleons/types';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { Image } from 'react-native';

export default function ArticleHeaderAtom({
  style,
  imageSource,
  children
}: PropsWithStyle<StackProps & { imageSource: number }>) {
  const width = useNuclearContentWidth();
  return (
    <Stack space={4} style={style}>
      <Image style={{ width, height: (9 / 16) * width }} source={imageSource} />
      {children}
    </Stack>
  );
}
