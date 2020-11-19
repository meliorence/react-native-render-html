import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function BidirectionalScrollView({
  children,
  padding
}: PropsWithChildren<{ padding?: number }>) {
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      horizontal
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: padding }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingVertical: padding }}>
        {children}
      </ScrollView>
    </ScrollView>
  );
}
