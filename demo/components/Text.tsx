import * as React from 'react';
import { TextProps, Text as NativeText } from 'react-native';
import { useThemeColors } from '../state/ThemeProvider';

export default function Text(props: React.PropsWithChildren<TextProps>) {
  const { text } = useThemeColors();
  return (
    <NativeText
      {...props}
      style={[
        {
          color: text
        },
        props.style
      ]}
    />
  );
}
