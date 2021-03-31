import React from 'react';
import { useColorRoles } from '../../../theme/colorSystem';
import UIColorPickerControlAtom from '../../UIColorPickerControlAtom';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter
} from './playgroundStore';

export default function SheetRouteColor() {
  const color = usePlaygroundStateSlice('color');
  const { surface } = useColorRoles();
  const setColor = usePlaygroundSetter('color');
  return (
    <UIColorPickerControlAtom
      initialValue={color ?? surface.content}
      onSelectedValueChange={setColor}
    />
  );
}
