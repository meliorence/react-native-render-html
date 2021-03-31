/* eslint-disable react-native/no-inline-styles */
import Color from 'color';
import React, { ComponentType, useCallback, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
const HsvColorPicker = require('react-native-hsv-color-picker')
  .default as HsvColorPicker;
import { SelectorProps, PropsWithStyle } from './nucleons/types';

type HsvColorPicker = ComponentType<Record<string, any>>;

export type UIColorPickerControlAtomProps = Pick<
  SelectorProps<string>,
  'onSelectedValueChange'
> &
  PropsWithStyle<{
    initialValue: string;
  }>;

export default function UIColorPickerControlAtom({
  onSelectedValueChange,
  initialValue,
  style
}: UIColorPickerControlAtomProps) {
  const getInitialSaturation = useCallback(() => {
    const col = Color(initialValue);
    return {
      hue: col.hue(),
      saturation: col.saturationv(),
      value: col.value()
    };
  }, [initialValue]);
  const [{ hue, saturation, value }, setHsv] = useState(getInitialSaturation);
  const selectedColor = Color({
    h: hue,
    s: saturation * 100,
    v: value * 100
  }).string();
  useEffect(
    function onHSVUpdate() {
      onSelectedValueChange?.call(null, selectedColor);
    },
    [onSelectedValueChange, selectedColor]
  );
  const onSaturationAndValueChange = useCallback(
    function onSaturationAndValueChange({
      saturation: s,
      value: v
    }: {
      saturation: number;
      value: number;
    }) {
      setHsv((state) => ({ ...state, saturation: s, value: v }));
    },
    []
  );
  const onHueChange = useCallback(function onHueChange({
    hue: h
  }: {
    hue: number;
  }) {
    setHsv((state) => ({ ...state, hue: h }));
  },
  []);
  return (
    <View style={[style, { alignItems: 'center' }]}>
      <NativeViewGestureHandler
        disallowInterruption={true}
        shouldActivateOnStart={true}
        shouldCancelWhenOutside={false}>
        <HsvColorPicker
          huePickerHue={hue}
          satValPickerHue={hue}
          satValPickerSaturation={saturation}
          satValPickerValue={value}
          onHuePickerDragMove={onHueChange}
          onHuePickerPress={onHueChange}
          onSatValPickerPress={onSaturationAndValueChange}
          onSatValPickerDragMove={onSaturationAndValueChange}
        />
      </NativeViewGestureHandler>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          height: Dimensions.get('screen').height,
          backgroundColor: selectedColor
        }}
      />
    </View>
  );
}
