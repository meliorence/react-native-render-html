import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextRoleNucleonProps } from './nucleons/useTextRoleNucleon';
import useSelectorItemsNucleon from './nucleons/useSelectorPropsNucleon';
import UIRadioItemAtom from './UIRadioItemAtom';
import selectedRadioItemContextAtom from './selectedRadioItemContextAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import { SelectorListProps } from './nucleons/types';
import { useSpacing } from '@mobily/stacks';

export interface UIRadioGroupControlMoleculeProps<V extends string>
  extends SelectorListProps<V> {
  style?: StyleProp<ViewStyle>;
  labelStyle?: TextRoleNucleonProps;
}

export default function UIRadioGroupControlMolecule<V extends string>({
  items,
  selectedValue,
  onSelectedValueChange,
  style,
  labelStyle
}: UIRadioGroupControlMoleculeProps<V>) {
  const normalizedItems = useSelectorItemsNucleon(items);
  const spacing = useSpacing(2);
  const itemStyle = useMemo(() => ({ paddingHorizontal: spacing }), [spacing]);
  return (
    <selectedRadioItemContextAtom.Provider value={selectedValue}>
      <BoxNucleon grow style={style}>
        {normalizedItems.map((props, i) => (
          <UIRadioItemAtom
            key={`${props.label}-${i}`}
            labelStyle={labelStyle}
            {...props}
            style={itemStyle}
            onSelectedValueChange={onSelectedValueChange}
          />
        ))}
      </BoxNucleon>
    </selectedRadioItemContextAtom.Provider>
  );
}
