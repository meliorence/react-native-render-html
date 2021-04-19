import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import resources, { ResourceRouteName } from '../resources';
import useSurfaceBackgroundStyleNucleon from './nucleons/useSurfaceBackgroundStyleNucleon';
import { UINavTideMoleculeProps } from './UINavTideMolecule';
import UITideAtom from './UITideAtom';

export type UINavResourceTideMoleculeProps<R extends ResourceRouteName> = Omit<
  UINavTideMoleculeProps<R>,
  'leftIconName' | 'label'
>;

export default function UINavResourceTideMolecule<R extends ResourceRouteName>({
  route,
  ...props
}: UINavResourceTideMoleculeProps<ResourceRouteName>) {
  const definition = resources[route];
  const navigation = useNavigation();
  return (
    <UITideAtom
      {...props}
      leftIconName={definition.iconName}
      title={definition.title}
      style={useSurfaceBackgroundStyleNucleon()}
      onPress={useCallback(() => navigation.navigate(route), [
        navigation,
        route
      ])}
    />
  );
}
