import React from 'react';
import RadioListControlMolecule from '../../molecules/RadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter,
  olListTypes
} from './playgroundStore';

export default function SheetRouteOlListType() {
  const olListType = usePlaygroundStateSlice('olListType');
  const setListType = usePlaygroundSetter('olListType');
  return (
    <RadioListControlMolecule
      selectedValue={olListType}
      onSelectedValueChange={setListType}
      items={olListTypes}
    />
  );
}
