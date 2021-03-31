import React, { useCallback } from 'react';
import UITideAtom, { TideAtomProps } from './UITideAtom';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { useNavigation } from '@react-navigation/core';
import { useColorRoles } from '../theme/colorSystem';

export default function UINavTideMolecule<R extends string>({
  leftIconName,
  description,
  label,
  route,
  ...listProps
}: Omit<TideAtomProps, 'rightIconName' | 'onPress' | 'title'> & {
  description?: string;
  route: R;
  label: string;
}) {
  const navigation = useNavigation();
  const { surface } = useColorRoles();
  const bottom = description
    ? () => (
        <TextRoleNucleon role="uiDescription" color={surface.secondaryContent}>
          {description}
        </TextRoleNucleon>
      )
    : null;
  return (
    <UITideAtom
      {...listProps}
      title={label}
      onPress={useCallback(() => navigation.navigate(route), [
        navigation,
        route
      ])}
      bottom={bottom}
      leftIconName={leftIconName}
      rightIconName="arrow-right"
    />
  );
}
