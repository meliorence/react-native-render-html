/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MarkedList from '@jsamr/react-native-li';
import upperAlpha from '@jsamr/counter-style/presets/upperAlpha';
import decimal from '@jsamr/counter-style/presets/decimal';
import disc from '@jsamr/counter-style/presets/disc';
import { PropsWithChildren } from 'react';
import useTextRoleNucleon from './nucleons/useTextRoleNucleon';
import BoxNucleon from './nucleons/BoxNucleon';
import { BODY_HZ_SPACING } from '../constants';
import { Stack } from '@mobily/stacks';

type ListType = 'upper-alpha' | 'decimal' | 'disc';

const mappings: Record<ListType, typeof disc> = {
  'upper-alpha': upperAlpha,
  decimal,
  disc
};

const Container = (props: any) => <Stack space={1} {...props} />;

export default function BodyListAtom({
  children,
  type = 'decimal'
}: PropsWithChildren<{ type?: 'upper-alpha' | 'decimal' | 'disc' }>) {
  const prefixStyle = useTextRoleNucleon({ role: 'body' });
  return (
    <BoxNucleon paddingX={BODY_HZ_SPACING}>
      <MarkedList
        Container={Container}
        markerTextStyle={{
          ...prefixStyle,
          textAlign: 'right'
        }}
        counterRenderer={mappings[type]}>
        {children}
      </MarkedList>
    </BoxNucleon>
  );
}
