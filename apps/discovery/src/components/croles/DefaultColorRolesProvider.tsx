import React from 'react';
import {
  ColorPrimitivesDeclaration,
  ColorRoles,
  ColorRolesProvider
} from '../../theme/colorSystem';
import { PropsWithChildren } from 'react';
import generateColorRoles from '../../theme/generateColorRoles';

function mapPrimitivesColorRoles(
  primitives: ColorPrimitivesDeclaration
): ColorRoles {
  const { surface } = primitives;
  return generateColorRoles({
    name: 'default',
    surfaceColor: surface.color,
    surfaceContent: surface.content,
    primitives
  });
}

export default function DefaultColorRolesProvider({
  children
}: PropsWithChildren<{}>) {
  return (
    <ColorRolesProvider mapPrimitivesToColorRoles={mapPrimitivesColorRoles}>
      {children}
    </ColorRolesProvider>
  );
}
