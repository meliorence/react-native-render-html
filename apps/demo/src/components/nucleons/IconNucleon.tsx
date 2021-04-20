import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { useColorRoles } from '../../theme/colorSystem';

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type IconNucleonProps = ComponentProps<typeof MaterialCommunityIcons>;

export default function IconNucleon(props: IconNucleonProps) {
  const { softIconColor } = useColorRoles();
  return <MaterialCommunityIcons color={softIconColor} {...props} />;
}
