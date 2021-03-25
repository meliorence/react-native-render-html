import React from 'react';
import RadioListControlMolecule from '../../molecules/RadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter,
  ulListTypes
} from './playgroundStore';

export default function SheetRouteUlListType() {
  const ulListType = usePlaygroundStateSlice('ulListType');
  const setListType = usePlaygroundSetter('ulListType');
  return (
    <RadioListControlMolecule
      selectedValue={ulListType}
      onSelectedValueChange={setListType}
      items={ulListTypes}
    />
  );
}
