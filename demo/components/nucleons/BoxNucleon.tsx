import React, { useMemo } from 'react';
import { Box, BoxProps, Direction } from '@mobily/stacks';
import { StyleProp, ViewStyle } from 'react-native';
import textColorContext from '../../state/textColorContext';

export type BoxNucleonProps<D extends Direction> = BoxProps<D> & {
  color?: string;
  backgroundColor?: string;
  grow?: boolean;
};

export default function BoxNucleon<D extends Direction>({
  color,
  style,
  backgroundColor,
  grow,
  ...props
}: BoxNucleonProps<D>) {
  const syntheticStyle: StyleProp<ViewStyle>[] = useMemo(
    () => [{ backgroundColor, flexGrow: grow ? 1 : 0 }, style],
    [backgroundColor, grow, style]
  );
  const box = <Box {...props} style={syntheticStyle} />;
  if (typeof color === 'string') {
    return (
      <textColorContext.Provider value={color}>{box}</textColorContext.Provider>
    );
  }
  return box;
}
