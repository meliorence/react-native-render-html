import React, { useRef } from 'react';
import Slider, { SliderProps } from '@react-native-community/slider';
import { createNativeWrapper } from 'react-native-gesture-handler';
import { AccessibilityProps, Platform, View } from 'react-native';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { useColorRoles } from '../theme/colorSystem';

const GestureSlider = Platform.select({
  android: createNativeWrapper(Slider, {
    disallowInterruption: true,
    shouldActivateOnStart: true,
    shouldCancelWhenOutside: false
  }) as unknown as typeof Slider,
  default: Slider
});

export type SliderControlAtomProps = Pick<
  SliderProps,
  'step' | 'minimumValue' | 'maximumValue' | 'value' | 'onValueChange' | 'style'
> & {
  width?: number;
} & AccessibilityProps;

// Fix offsets, see https://github.com/callstack/react-native-slider/issues/258
function getFixedStyle(contentWidth: number) {
  const offsetLeft = Platform.select({ android: -15, default: 0 });
  const offsetRight = Platform.select({ android: -15, default: 0 });
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
  style,
  ...accessibilityProps
}: SliderControlAtomProps) {
  const initialValueRef = useRef(value);
  const { switchColor, trackColor } = useColorRoles();
  const contentWidth = useNuclearContentWidth();
  const syntheticContentWidth = width ?? contentWidth;
  return (
    <View style={style}>
      <GestureSlider
        // Must be reinstantiated after rotations, otherwise crashes.
        key={syntheticContentWidth}
        style={getFixedStyle(syntheticContentWidth)}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        thumbTintColor={switchColor.on}
        minimumTrackTintColor={trackColor.on}
        maximumTrackTintColor={trackColor.off}
        value={initialValueRef.current}
        onValueChange={onValueChange}
        {...accessibilityProps}
      />
    </View>
  );
}
