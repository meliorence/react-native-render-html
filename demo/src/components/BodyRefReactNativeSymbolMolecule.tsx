import React from 'react';
import useOnLinkPress from '../hooks/useOnLinkPress';
import BodyHyperlinkAtom from './BodyHyperlinkAtom';
import { RefProps } from './nucleons/types';
import type * as RN from 'react-native';

export default function BodyRefReactNativeSymbolMolecule({
  name,
  ...props
}: RefProps<keyof typeof RN>) {
  const onLinkPress = useOnLinkPress(`https://reactnative.dev/docs/${name}`);
  return (
    <BodyHyperlinkAtom {...props} onPress={onLinkPress}>
      {name}
    </BodyHyperlinkAtom>
  );
}
