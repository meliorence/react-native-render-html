import React from 'react';
import Constants from 'expo-constants';
import RadioListControlMolecule from '../../molecules/RadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter
} from './playgroundStore';

export default function SheetRouteFontFamily() {
  const fontFamily = usePlaygroundStateSlice('fontFamily');
  const setFontFamily = usePlaygroundSetter('fontFamily');
  return (
    <RadioListControlMolecule
      selectedValue={fontFamily}
      onSelectedValueChange={setFontFamily}
      items={Constants.systemFonts}
    />
  );
}
