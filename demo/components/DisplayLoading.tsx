import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useComponentColors } from '../state/ThemeProvider';

export default function DisplayLoading() {
  const {
    displayLoading: { color }
  } = useComponentColors();
  return (
    <View
      style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={color} size="large" />
    </View>
  );
}
