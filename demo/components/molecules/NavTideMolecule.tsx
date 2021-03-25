import React, { useCallback } from 'react';
import TideAtom, { TideAtomProps } from '../atoms/TideAtom';
import TextNucleon from '../nucleons/TextNucleon';
import useNuclearTextColor from '../nucleons/useNuclearTextColor';
import Color from 'color';
import { useNavigation } from '@react-navigation/core';

export default function NavTideMolecule<R extends string>({
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
  const descriptionColor = Color(useNuclearTextColor() as string)
    .alpha(0.5)
    .string();
  const bottom = description
    ? () => (
        <TextNucleon fontSize="small" color={descriptionColor}>
          {description}
        </TextNucleon>
      )
    : null;
  return (
    <TideAtom
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
