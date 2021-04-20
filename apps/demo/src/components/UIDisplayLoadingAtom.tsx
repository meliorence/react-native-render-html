import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useColorRoles } from '../theme/colorSystem';
import BoxNucleon from './nucleons/BoxNucleon';

export default function UIDisplayLoadingAtom({
  style
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const { spinnerColor } = useColorRoles();
  return (
    <BoxNucleon grow alignX="center" alignY="center" style={style}>
      <ActivityIndicator color={spinnerColor} size="large" />
    </BoxNucleon>
  );
}
