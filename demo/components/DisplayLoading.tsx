import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function DisplayLoading() {
  return (
    <View
      style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
