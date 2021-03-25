import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import useNuclearTextColor from './useNuclearTextColor';

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type IconNucleonProps = ComponentProps<typeof MaterialCommunityIcons>;

export default function IconNucleon(props: IconNucleonProps) {
  const color = useNuclearTextColor(props.color);
  return <MaterialCommunityIcons color={color} {...props} />;
}
