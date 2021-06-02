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
  const { heading } = primitives;
  return generateColorRoles({
    name: 'header',
    surfaceColor: heading.content,
    surfaceContent: heading.color,
    primitives
  });
}

export default function HeaderColorRolesProvider({
  children
}: PropsWithChildren<{}>) {
  return (
    <ColorRolesProvider mapPrimitivesToColorRoles={mapPrimitivesColorRoles}>
      {children}
    </ColorRolesProvider>
  );
}
