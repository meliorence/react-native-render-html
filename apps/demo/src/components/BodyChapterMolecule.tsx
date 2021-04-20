import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { BODY_HZ_SPACING, BODY_PARAGRAPH_SPACING } from '../constants';
import { useColorRoles } from '../theme/colorSystem';
import BodyDividerAtom from './BodyDividerAtom';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';

function BodyHeader({
  children,
  style
}: PropsWithStyle<PropsWithChildren<{}>>) {
  const { surface } = useColorRoles();
  const color = surface.secondaryContent;
  return (
    <Stack space={1}>
      <BodyDividerAtom height={StyleSheet.hairlineWidth} color={color} />
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <TextRoleNucleon color={color} role="bodyHeader1" style={style}>
          {children}
        </TextRoleNucleon>
      </BoxNucleon>
      <BodyDividerAtom height={StyleSheet.hairlineWidth} color={color} />
    </Stack>
  );
}

export type BodyChapterMoleculeProps = PropsWithChildren<
  PropsWithStyle<{ title: string; prefix?: string }>
>;

export default function BodyChapterMolecule({
  title,
  style,
  prefix,
  children
}: BodyChapterMoleculeProps) {
  return (
    <MaxWidthContainerAtom style={style}>
      <Stack space={BODY_PARAGRAPH_SPACING}>
        <BodyHeader>
          {prefix}
          {title}
        </BodyHeader>
        {children}
      </Stack>
    </MaxWidthContainerAtom>
  );
}
