import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BoxNucleon from '../../nucleons/BoxNucleon';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import {
  BODY_CHAPTER_SPACING,
  BODY_PARAGRAPH_SPACING
} from '../../../constants';
import { Image, ImageRequireSource } from 'react-native';
import { useNuclearContentWidth } from '../../nucleons/useContentWidthContext';

export default function ArticleTemplate({
  children,
  imageSource
}: PropsWithChildren<{ imageSource: ImageRequireSource }>) {
  const width = useNuclearContentWidth();
  const height = Math.min((9 / 16) * width, 300);
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      contentContainerStyle={useSurfaceBackgroundStyleNucleon()}>
      <Image style={{ width, height }} source={imageSource} />
      <BoxNucleon paddingBottom={BODY_PARAGRAPH_SPACING}>
        <Stack space={BODY_CHAPTER_SPACING}>{children}</Stack>
      </BoxNucleon>
    </ScrollView>
  );
}
