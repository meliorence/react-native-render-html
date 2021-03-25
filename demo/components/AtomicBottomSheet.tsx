import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackgroundProps,
  BottomSheetProps
} from '@gorhom/bottom-sheet';
import { useThemeColors } from '../state/ThemeProvider';
import Color from 'color';

const RADIUS = 15;

const atomicBottomSheetContext = createContext(false);

export function useAtomicBottomSheet() {
  return useContext(atomicBottomSheetContext);
}

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
          backgroundColor: theme.card
        }
      ]}
    />
  );
};

export default function AtomicBottomSheet({
  snapPoints,
  children
}: Pick<BottomSheetProps, 'snapPoints' | 'children'>) {
  return (
    <atomicBottomSheetContext.Provider value={true}>
      <BottomSheet
        handleComponent={Handle}
        backgroundComponent={Background}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}>
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheet>
    </atomicBottomSheetContext.Provider>
  );
}
