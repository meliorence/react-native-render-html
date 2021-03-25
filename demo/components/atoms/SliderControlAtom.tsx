import React, { useRef } from 'react';
import Slider, { SliderProps } from '@react-native-community/slider';
import { useComponentColors } from '../../state/ThemeProvider';
import { Platform, View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import Color from 'color';
import { useColorScheme } from '../../state/ColorSchemeProvider';

export type SliderControlAtomProps = Pick<
  SliderProps,
  'step' | 'minimumValue' | 'maximumValue' | 'value' | 'onValueChange' | 'style'
> & {
  width?: number;
};

// Fix offsets, see https://github.com/callstack/react-native-slider/issues/258
function getFixedStyle(contentWidth: number) {
  const offsetLeft = Platform.select({ android: -15, default: 0 });
  const offsetRight = Platform.select({ android: -45, default: -45 });
  return {
    width: contentWidth + Math.abs(offsetLeft + offsetRight),
    marginLeft: offsetLeft,
    marginRight: offsetRight
  };
}

export default function SliderControlAtom({
  maximumValue,
  minimumValue,
  onValueChange,
  step,
  value,
  width,
  style
}: SliderControlAtomProps) {
  const initialValueRef = useRef(value);
  const colors = useComponentColors('controls');
  const contentWidth = useNuclearContentWidth();
  const isDarkMode = useColorScheme();
  const syntheticContentWidth = width ?? contentWidth;
  const maxTrackColor = Color(colors.trackColorOff);
  return (
    <View style={style}>
      <NativeViewGestureHandler disallowInterruption={true}>
        <Slider
          style={getFixedStyle(syntheticContentWidth)}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          thumbTintColor={colors.tintColorOn}
          minimumTrackTintColor={colors.trackColorOn}
          maximumTrackTintColor={
            isDarkMode
              ? maxTrackColor.lighten(0.5).string()
              : maxTrackColor.darken(1).string()
          }
          value={initialValueRef.current}
          onValueChange={onValueChange}
        />
      </NativeViewGestureHandler>
    </View>
  );
}
