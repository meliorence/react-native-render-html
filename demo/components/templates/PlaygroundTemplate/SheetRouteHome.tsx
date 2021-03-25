import { Stack } from '@mobily/stacks';
import React, { useContext } from 'react';
import BoxNucleon from '../../nucleons/BoxNucleon';
import NavTideMolecule from '../../molecules/NavTideMolecule';
import { demoDescriptionContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';

export default function SheetRouteHome() {
  const description = useContext(demoDescriptionContext);
  return (
    <SheetRouteContainer>
      <NavTideMolecule
        route="PlaygroundControls"
        label="Play"
        description="Change component props and observe how the rendered snippet adjusts."
        leftIconName="gamepad-circle"
      />
      <NavTideMolecule
        route="PlaygroundSource"
        label="Change and inspect HTML source"
        description="Select and inspect a HTML snippet, watch the transient render tree."
        leftIconName="language-html5"
      />
      <BoxNucleon padding={2}>
        <Stack space={2}>{description}</Stack>
      </BoxNucleon>
    </SheetRouteContainer>
  );
}
