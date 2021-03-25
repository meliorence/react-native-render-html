import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import TideAtom, { TideAtomProps } from '../atoms/TideAtom';
import SliderControlAtom, {
  SliderControlAtomProps
} from '../atoms/SliderControlAtom';
import TextNucleon from '../nucleons/TextNucleon';

export type SliderTideMolecule = Omit<
  SliderControlAtomProps,
  'width' | 'style'
> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: TideAtomProps['leftIconName'];
  label: string;
};

export default function SliderTideMolecule({
  style,
  label,
  leftIconName,
  ...sliderProps
}: SliderTideMolecule) {
  const right = () => (
    <TextNucleon align="end">{sliderProps.value?.toFixed(1)}</TextNucleon>
  );
  const bottom = () => <SliderControlAtom {...sliderProps} />;
  return (
    <TideAtom
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
      bottom={bottom}
    />
  );
}
