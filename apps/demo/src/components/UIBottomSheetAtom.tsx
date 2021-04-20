import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetProps
} from '@gorhom/bottom-sheet';
import gestureHandlerContextNucleon from './nucleons/gestureHandlerContextNucleon';
import useSurfaceBackgroundStyleNucleon from './nucleons/useSurfaceBackgroundStyleNucleon';
import { useColorRoles } from '../theme/colorSystem';

const RADIUS = 15;

const styles = StyleSheet.create({
  radiusTop: {
    borderTopRightRadius: RADIUS,
    borderTopLeftRadius: RADIUS
  },
  handle: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    position: 'absolute',
    width: 30,
    height: 5,
    borderRadius: 5
  }
});

const Handle = () => {
  const { sheetHandle } = useColorRoles();
  return (
    <View
      style={[
        styles.handle,
        styles.radiusTop,
        { backgroundColor: sheetHandle.background }
      ]}>
      <View style={[styles.indicator, { backgroundColor: sheetHandle.slot }]} />
    </View>
  );
};

const Background = ({ style }: BottomSheetBackgroundProps) => {
  const backdropStyles = useSurfaceBackgroundStyleNucleon();
  return <View style={[style, styles.radiusTop, backdropStyles]} />;
};

export default function UIBottomSheetAtom({
  snapPoints,
  children,
  ...props
}: Omit<BottomSheetProps, 'handleComponent' | 'backgroundComponent'>) {
  return (
    <gestureHandlerContextNucleon.Provider value={true}>
      <BottomSheet
        handleComponent={Handle}
        backgroundComponent={Background}
        enableContentPanningGesture={true}
        snapPoints={snapPoints}
        {...props}>
        {children}
      </BottomSheet>
    </gestureHandlerContextNucleon.Provider>
  );
}
