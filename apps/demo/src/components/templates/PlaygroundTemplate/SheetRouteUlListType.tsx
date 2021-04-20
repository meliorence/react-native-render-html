import React from 'react';
import UIRadioListControlMolecule from '../../UIRadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter,
  ulListTypes
} from './playgroundStore';

export default function SheetRouteUlListType() {
  const ulListType = usePlaygroundStateSlice('ulListType');
  const setUlListType = usePlaygroundSetter('ulListType');
  return (
    <UIRadioListControlMolecule
      selectedValue={ulListType}
      onSelectedValueChange={setUlListType}
      items={ulListTypes}
    />
  );
}
