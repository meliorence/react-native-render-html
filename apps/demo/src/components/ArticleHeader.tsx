import React from 'react';
import { Stack, StackProps } from '@mobily/stacks';
import { PropsWithStyle } from './nucleons/types';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { Image } from 'react-native';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';

export default function ArticleHeaderAtom({
  style,
  imageSource,
  children
}: PropsWithStyle<StackProps & { imageSource: number }>) {
  const width = useNuclearContentWidth();
  const height = Math.min((9 / 16) * width, 300);
  return (
    <Stack space={4} style={style}>
      <Image style={{ width, height }} source={imageSource} />
      <MaxWidthContainerAtom>
        <Stack space={4}>{children}</Stack>
      </MaxWidthContainerAtom>
    </Stack>
  );
}
