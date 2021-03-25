import React, { ReactElement, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TNode } from 'react-native-render-html';
import BottomSheetAtom from '../../atoms/BottomSheetAtom';
import BoxNucleon from '../../nucleons/BoxNucleon';
import { demoStateContext } from './contexts';
import { usePlaygroundSource } from './playgroundStore';
import SheetChildrenRenderer from './SheetChildrenRenderer';
import SheetControlsPortal from './SheetControlsPortal';
import SheetDescriptionPortal from './SheetDescriptionPortal';
import SheetNavigator from './SheetNavigator';
import SheetNavigatorPortal from './SheetNavigatorPortal';
import sheetSnapPoints from './sheetSnapPoints';

export type SheetProps = {
  ttree?: TNode;
  style?: StyleProp<ViewStyle>;
  children: ReactElement<
    | typeof SheetControlsPortal
    | typeof SheetDescriptionPortal
    | typeof SheetNavigatorPortal
  >[];
};

export default function Sheet({ ttree, children, style }: SheetProps) {
  const html = usePlaygroundSource().source;
  return (
    <BottomSheetAtom
      enableContentPanningGesture={true}
      snapPoints={sheetSnapPoints}>
      <demoStateContext.Provider
        value={useMemo(() => ({ html, ttree }), [html, ttree])}>
        <BoxNucleon grow style={style}>
          <SheetChildrenRenderer tpChildren={children}>
            <SheetNavigator />
          </SheetChildrenRenderer>
        </BoxNucleon>
      </demoStateContext.Provider>
    </BottomSheetAtom>
  );
}
