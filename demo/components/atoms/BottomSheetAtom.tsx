import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetProps
} from '@gorhom/bottom-sheet';
import { useThemeColors } from '../../state/ThemeProvider';
import Color from 'color';
import gestureHandlerContextNucleon from '../nucleons/gestureHandlerContextNucleon';

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
  const theme = useThemeColors();
  return (
    <View
      style={[
        styles.handle,
        styles.radiusTop,
        { backgroundColor: Color(theme.card).darken(0.1).string() }
      ]}>
      <View style={[styles.indicator, { backgroundColor: theme.primary }]} />
    </View>
  );
};

const Background = ({ style }: BottomSheetBackgroundProps) => {
  const theme = useThemeColors();
  return (
    <View
      style={[
        style,
        styles.radiusTop,
        {
          backgroundColor: Color(theme.card).alpha(0.95).string()
        }
      ]}
    />
  );
};

export default function BottomSheetAtom({
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
