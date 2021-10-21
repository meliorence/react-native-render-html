import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: { flexGrow: 1 }
});

export default function SheetRouteContainer({
  children
}: PropsWithChildren<{}>) {
  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.flex}
      style={styles.flex}>
      {children}
    </BottomSheetScrollView>
  );
}
