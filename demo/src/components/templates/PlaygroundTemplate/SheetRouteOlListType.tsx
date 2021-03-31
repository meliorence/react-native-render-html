import React from 'react';
import UIRadioListControlMolecule from '../../UIRadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter,
  olListTypes
} from './playgroundStore';

export default function SheetRouteOlListType() {
  const olListType = usePlaygroundStateSlice('olListType');
  const setListType = usePlaygroundSetter('olListType');
  return (
    <UIRadioListControlMolecule
      selectedValue={olListType}
      onSelectedValueChange={setListType}
      items={olListTypes}
    />
  );
}
