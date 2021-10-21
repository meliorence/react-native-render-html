import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { BODY_HZ_SPACING, BODY_PARAGRAPH_SPACING } from '../constants';
import { useColorRoles } from '../theme/colorSystem';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';

function BodyHeader({
  children,
  style
}: PropsWithStyle<PropsWithChildren<{}>>) {
  const { surface } = useColorRoles();
  const color = surface.content;
  return (
    <Stack space={1}>
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <TextRoleNucleon color={color} role="bodyHeader2" style={style}>
          {children}
        </TextRoleNucleon>
      </BoxNucleon>
    </Stack>
  );
}

export type BodySectionMoleculeProps = PropsWithChildren<
  PropsWithStyle<{ title: string; prefix?: string }>
>;

export default function BodySectionMolecule({
  title,
  style,
  children
}: BodySectionMoleculeProps) {
  return (
    <MaxWidthContainerAtom style={style}>
      <Stack space={BODY_PARAGRAPH_SPACING}>
        <BodyHeader>{title}</BodyHeader>
        {children}
      </Stack>
    </MaxWidthContainerAtom>
  );
}
