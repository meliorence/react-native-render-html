import React from 'react';
import UIRadioListControlMolecule, {
  RadioListControlProps
} from '../../UIRadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter
} from './playgroundStore';
import { SYSTEM_FONTS } from '../../../constants';

const getLabelStyle: RadioListControlProps<string>['labelStyle'] = ({
  value
}) => ({
  fontFamily: value
});

export default function SheetRouteFontFamily() {
  const fontFamily = usePlaygroundStateSlice('fontFamily');
  const setFontFamily = usePlaygroundSetter('fontFamily');
  return (
    <UIRadioListControlMolecule
      selectedValue={fontFamily}
      onSelectedValueChange={setFontFamily}
      items={SYSTEM_FONTS}
      labelStyle={getLabelStyle}
    />
  );
}
