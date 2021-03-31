import { Stack } from '@mobily/stacks';
import React, { useContext } from 'react';
import BoxNucleon from '../../nucleons/BoxNucleon';
import UINavTideMolecule from '../../UINavTideMolecule';
import { demoDescriptionContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';

export default function SheetRouteHome() {
  const description = useContext(demoDescriptionContext);
  return (
    <SheetRouteContainer>
      <Stack space={2}>
        <UINavTideMolecule
          route="PlaygroundControls"
          label="Play"
          description="Change component props and observe how the rendered snippet adjusts."
          leftIconName="gamepad-circle"
        />
        <UINavTideMolecule
          route="PlaygroundSource"
          label="Change and inspect HTML source"
          description="Select and inspect a HTML snippet, watch the transient render tree."
          leftIconName="language-html5"
        />
        <BoxNucleon padding={2}>
          <Stack space={2}>{description}</Stack>
        </BoxNucleon>
      </Stack>
    </SheetRouteContainer>
  );
}
