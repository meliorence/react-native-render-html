import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import UIRadioGroupControlMolecule from '../../UIRadioGroupControlMolecule';
import UISourceDisplayMolecule from '../../UISourceDisplayMolecule';
import UITTreeDisplayMolecule from '../../UITTreeDisplayMolecule';
import BoxNucleon from '../../nucleons/BoxNucleon';
import { demoStateContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';
import {
  usePlaygroundSetter,
  usePlaygroundStateSlice
} from './playgroundStore';
import { useColorPrimitives, useColorRoles } from '../../../theme/colorSystem';
import { PropsWithStyle } from '../../nucleons/types';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';

function SourceSectionTitle({
  title,
  style
}: PropsWithStyle<{ title: string }>) {
  const { surface } = useColorRoles();
  return (
    <BoxNucleon padding={1} style={style}>
      <TextRoleNucleon
        role="sectionOutline"
        align="start"
        color={surface.secondaryContent}>
        {title}
      </TextRoleNucleon>
    </BoxNucleon>
  );
}

function SourceRouteSection({
  children,
  title,
  style
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  title: string;
}>) {
  return (
    <BoxNucleon style={style}>
      <Stack space={0}>
        <SourceSectionTitle title={title} />
        <BoxNucleon>{children}</BoxNucleon>
      </Stack>
    </BoxNucleon>
  );
}

function SourceBoxAtom({
  children,
  padding,
  style
}: PropsWithChildren<{ style?: StyleProp<ViewStyle>; padding?: number }>) {
  const { surface: background } = useColorPrimitives();
  return (
    <BoxNucleon
      padding={padding}
      style={style}
      backgroundColor={background.content}
      color={background.color}>
      {children}
    </BoxNucleon>
  );
}

function HtmlDisplayBox({ html, style }: { html: string; style?: any }) {
  return (
    <SourceBoxAtom style={style}>
      <UISourceDisplayMolecule
        clipLines
        content={html}
        paddingVertical={2}
        language="html"
      />
    </SourceBoxAtom>
  );
}

export default function SheetSourceRoute() {
  const ttree = useContext(demoStateContext).ttree;
  const html = useContext(demoStateContext).html;
  const sourceMap = usePlaygroundStateSlice('sourceMap');
  const selectedSource = usePlaygroundStateSlice('selectedSource');
  const setSelectedSource = usePlaygroundSetter('selectedSource');
  const items = useMemo(
    () =>
      Object.keys(sourceMap).map((key) => ({
        label: sourceMap[key].label,
        value: key
      })),
    [sourceMap]
  );
  return (
    <SheetRouteContainer>
      <BoxNucleon>
        <Stack space={4}>
          <SourceRouteSection title="Select source">
            <UIRadioGroupControlMolecule
              selectedValue={selectedSource}
              onSelectedValueChange={setSelectedSource}
              items={items}
            />
          </SourceRouteSection>
          <SourceRouteSection title="HTML source">
            <HtmlDisplayBox html={html} />
          </SourceRouteSection>
          <SourceRouteSection title="Transient Render Tree">
            <SourceBoxAtom padding={2}>
              <UITTreeDisplayMolecule ttree={ttree} />
            </SourceBoxAtom>
          </SourceRouteSection>
        </Stack>
      </BoxNucleon>
    </SheetRouteContainer>
  );
}
