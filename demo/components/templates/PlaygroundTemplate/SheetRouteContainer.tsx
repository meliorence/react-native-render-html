import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { PropsWithChildren } from 'react';

export default function SheetRouteContainer({
  children
}: PropsWithChildren<{}>) {
  return (
    <BottomSheetScrollView style={{ flexGrow: 1 }}>
      {children}
    </BottomSheetScrollView>
  );
}
