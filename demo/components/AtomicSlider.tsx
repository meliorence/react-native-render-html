import React, { useRef } from 'react';
import Slider, { SliderProps } from '@react-native-community/slider';
import { useThemeColors } from '../state/ThemeProvider';
import { Platform, View } from 'react-native';

export type AtomicSliderProp = Pick<
  SliderProps,
  'step' | 'minimumValue' | 'maximumValue' | 'value' | 'onValueChange' | 'style'
> & {
  width: number;
};

export default function AtomicSlider({
  maximumValue,
  minimumValue,
  onValueChange,
  step,
  value,
  style,
  width
}: AtomicSliderProp) {
  const initialValueRef = useRef(value);
  const theme = useThemeColors();
  const offset = Platform.select({ android: -15, default: 0 });
  return (
    <View style={style}>
      <Slider
        style={{
          width: width + 2 * Math.abs(offset),
          marginLeft: offset,
          marginRight: offset
        }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        thumbTintColor={theme.accent}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={'gray'}
        value={initialValueRef.current}
        onValueChange={onValueChange}
      />
    </View>
  );
}
