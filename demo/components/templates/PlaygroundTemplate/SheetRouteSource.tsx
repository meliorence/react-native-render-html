import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useComponentColors } from '../../../state/ThemeProvider';
import RadioGroupControlMolecule from '../../molecules/RadioGroupControlMolecule';
import SourceDisplayMolecule from '../../molecules/SourceDisplayMolecule';
import TTreeDisplayMolecule from '../../molecules/TTreeDisplayMolecule';
import BoxNucleon from '../../nucleons/BoxNucleon';
import TextNucleon from '../../nucleons/TextNucleon';
import { demoStateContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';
import {
  usePlaygroundSetter,
  usePlaygroundStateSlice
} from './playgroundStore';

function SourecRouteSection({
  children,
  title,
  style
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  title: string;
}>) {
  return (
    <BoxNucleon style={style}>
      <Stack space={2}>
        <TextNucleon>{title}</TextNucleon>
        {children}
      </Stack>
    </BoxNucleon>
  );
}

function SourceBoxAtom({
  children,
  style
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const combo = useComponentColors('sourceBox');
  return (
    <BoxNucleon padding={1} style={[style, { borderRadius: 10 }]} {...combo}>
      {children}
    </BoxNucleon>
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
      <BoxNucleon padding={2}>
        <Stack space={4}>
          <RadioGroupControlMolecule
            selectedValue={selectedSource}
            onSelectedValueChange={setSelectedSource}
            items={items}
          />
          <SourecRouteSection title="HTML source">
            <SourceBoxAtom>
              <SourceDisplayMolecule html={html} />
            </SourceBoxAtom>
          </SourecRouteSection>
          <SourecRouteSection title="Transient Render Tree">
            <SourceBoxAtom>
              <TTreeDisplayMolecule ttree={ttree} />
            </SourceBoxAtom>
          </SourecRouteSection>
        </Stack>
      </BoxNucleon>
    </SheetRouteContainer>
  );
}
