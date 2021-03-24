import React from 'react';
import { Box, BoxProps, Direction } from '@mobily/stacks';
import { StyleProp, ViewStyle } from 'react-native';
import textColorContext from '../state/textColorContext';

export type AtomicBoxProps<D extends Direction> = BoxProps<D> & {
  color?: string;
  backgroundColor?: string;
};

export default function AtomicBox<D extends Direction>({
  color,
  style,
  backgroundColor,
  ...props
}: AtomicBoxProps<D>) {
  const syntheticStyle: StyleProp<ViewStyle> =
    typeof backgroundColor === 'string' ? [{ backgroundColor }, style] : style;
  const box = <Box {...props} style={syntheticStyle} />;
  if (typeof color === 'string') {
    <textColorContext.Provider value={color}>{box}</textColorContext.Provider>;
  }
  return box;
}
