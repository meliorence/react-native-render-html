import React, { useRef } from 'react';
import Slider, { SliderProps } from '@react-native-community/slider';
import { useThemeColors } from '../state/ThemeProvider';

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
  return (
    <Slider
      style={[
        {
          width
        },
        style
      ]}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      thumbTintColor={theme.accent}
      minimumTrackTintColor={theme.accent}
      maximumTrackTintColor={theme.card}
      value={initialValueRef.current}
      onValueChange={onValueChange}
    />
  );
}
