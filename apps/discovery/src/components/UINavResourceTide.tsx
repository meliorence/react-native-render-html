import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { ResourceRoute, resourceRoutesIndex } from '../nav-model';
import useSurfaceBackgroundStyleNucleon from './nucleons/useSurfaceBackgroundStyleNucleon';
import { UINavTideMoleculeProps } from './UINavTideMolecule';
import UITideAtom from './UITideAtom';

export type UINavResourceTideMoleculeProps<R extends ResourceRoute> = Omit<
  UINavTideMoleculeProps<R>,
  'leftIconName' | 'label'
>;

export default function UINavResourceTideMolecule<R extends ResourceRoute>({
  route,
  ...props
}: UINavResourceTideMoleculeProps<R>) {
  const definition = resourceRoutesIndex[route];
  const navigation = useNavigation();
  return (
    <UITideAtom
      {...props}
      leftIconName={definition.iconName}
      title={definition.title}
      style={useSurfaceBackgroundStyleNucleon()}
      onPress={useCallback(
        () => navigation.navigate(route),
        [navigation, route]
      )}
    />
  );
}
