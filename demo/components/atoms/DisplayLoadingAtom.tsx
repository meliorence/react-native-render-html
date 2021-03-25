import { Box } from '@mobily/stacks';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useComponentColors } from '../../state/ThemeProvider';

export default function DisplayLoadingAtom({
  style
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const { color } = useComponentColors('displayLoading');
  return (
    <Box alignX="center" alignY="center" style={style}>
      <ActivityIndicator color={color} size="large" />
    </Box>
  );
}
