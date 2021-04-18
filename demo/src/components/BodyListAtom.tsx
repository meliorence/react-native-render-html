import React from 'react';
import MarkedList from '@jsamr/react-native-li';
import upperAlpha from '@jsamr/counter-style/presets/upperAlpha';
import decimal from '@jsamr/counter-style/presets/decimal';
import { PropsWithChildren } from 'react';
import useTextRoleNucleon from './nucleons/useTextRoleNucleon';
import BoxNucleon from './nucleons/BoxNucleon';

export default function BodyListAtom({
  children,
  type = 'decimal'
}: PropsWithChildren<{ type?: 'upper-alpha' | 'decimal' }>) {
  const prefixStyle = useTextRoleNucleon({ role: 'body' });
  return (
    <BoxNucleon paddingX={2}>
      <MarkedList
        markerTextStyle={{
          ...prefixStyle,
          textAlign: 'right'
        }}
        counterRenderer={type === 'decimal' ? decimal : upperAlpha}>
        {children}
      </MarkedList>
    </BoxNucleon>
  );
}
