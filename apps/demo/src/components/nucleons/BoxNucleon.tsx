import React, { useMemo } from 'react';
import { Box, BoxProps } from '@mobily/stacks';
import { StyleProp, ViewStyle } from 'react-native';

export type BoxNucleonProps = BoxProps & {
  backgroundColor?: string;
  grow?: boolean;
};

export default function BoxNucleon({
  style,
  backgroundColor,
  grow,
  ...props
}: BoxNucleonProps) {
  const syntheticStyle: StyleProp<ViewStyle>[] = useMemo(
    () => [{ backgroundColor, flexGrow: grow ? 1 : 0 }, style],
    [backgroundColor, grow, style]
  );
  const box = <Box {...props} style={syntheticStyle} />;
  // if (typeof color === 'string') {
  //   return (
  //     <textColorContext.Provider value={color}>{box}</textColorContext.Provider>
  //   );
  // }
  return box;
}
