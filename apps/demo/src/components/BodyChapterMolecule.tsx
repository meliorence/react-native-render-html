import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { BODY_HZ_SPACING, BODY_PARAGRAPH_SPACING } from '../constants';
import { useColorRoles } from '../theme/colorSystem';
import BodyDividerAtom from './BodyDividerAtom';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';

function BodyHeader({
  children,
  style,
  prefix
}: PropsWithStyle<PropsWithChildren<{ prefix: string }>>) {
  const { surface } = useColorRoles();
  const color = surface.content;
  return (
    <Stack space={1}>
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <TextRoleNucleon color={color} role="bodyHeader1" style={style}>
          {children}
        </TextRoleNucleon>
      </BoxNucleon>
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <BoxNucleon>
          <TextRoleNucleon color={surface.secondaryContent} role="body">
            Chapter {prefix}
          </TextRoleNucleon>
        </BoxNucleon>
        <BodyDividerAtom />
      </BoxNucleon>
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
        <BodyHeader prefix={prefix!}>{title}</BodyHeader>
        {children}
      </Stack>
    </MaxWidthContainerAtom>
  );
}
