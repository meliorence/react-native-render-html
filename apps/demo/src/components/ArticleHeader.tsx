import React from 'react';
import { Stack, StackProps } from '@mobily/stacks';
import { PropsWithStyle } from './nucleons/types';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';
import { BODY_CHAPTER_SPACING, BODY_PARAGRAPH_SPACING } from '../constants';

export default function ArticleHeaderAtom({
  style,
  children
}: PropsWithStyle<StackProps>) {
  return (
    <MaxWidthContainerAtom style={style}>
      <Stack paddingY={BODY_CHAPTER_SPACING} space={BODY_PARAGRAPH_SPACING}>
        {children}
      </Stack>
    </MaxWidthContainerAtom>
  );
}
