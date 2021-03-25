import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NuclearTextStyle } from '../nucleons/useNuclearTextStyle';
import useSelectorItemsNucleon, {
  SelectorProps
} from '../nucleons/useSelectorPropsNucleon';
import RadioItemAtom from '../atoms/RadioItemAtom';
import selectedRadioItemContextAtom from '../atoms/selectedRadioItemContextAtom';
import BoxNucleon from '../nucleons/BoxNucleon';

export interface RadioGroupControlProps<V extends string>
  extends SelectorProps<V> {
  style?: StyleProp<ViewStyle>;
  labelStyle?: NuclearTextStyle;
}

export default function RadioGroupControlMolecule<V extends string>({
  items,
  selectedValue,
  onSelectedValueChange,
  style,
  labelStyle
}: RadioGroupControlProps<V>) {
  const normalizedItems = useSelectorItemsNucleon(items);
  return (
    <selectedRadioItemContextAtom.Provider value={selectedValue}>
      <BoxNucleon grow style={style}>
        {normalizedItems.map((props, i) => (
          <RadioItemAtom
            key={`${props.label}-${i}`}
            labelStyle={labelStyle}
            {...props}
            onSelectedValueChange={onSelectedValueChange}
          />
        ))}
      </BoxNucleon>
    </selectedRadioItemContextAtom.Provider>
  );
}
