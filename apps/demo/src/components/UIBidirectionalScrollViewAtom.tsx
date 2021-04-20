import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

// TODO use spacing

export default function UIBidirectionalScrollViewAtom({
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
