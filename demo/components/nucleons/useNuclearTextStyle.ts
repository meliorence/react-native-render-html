import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Platform } from 'react-native';
import useNuclearTextColor from './useNuclearTextColor';

export interface NuclearTextStyle {
  color?: string;
  mono?: boolean;
  fontSize?: 'big' | 'normal' | 'small';
  align?: 'center' | 'start' | 'end';
  italic?: boolean;
  style?: StyleProp<TextStyle>;
}

const MONO = Platform.select({
  ios: 'Menlo',
  default: 'monospace'
});

export default function useNuclearTextStyle(props?: NuclearTextStyle) {
  const { color, style, mono, italic, align = 'start', fontSize = 'normal' } =
    props || {};
  const syntheticColor = useNuclearTextColor(color);
  return React.useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: syntheticColor,
        fontFamily: mono ? MONO : undefined,
        fontSize: fontSize === 'normal' ? 16 : fontSize === 'big' ? 25 : 11,
        fontStyle: italic ? 'italic' : 'normal',
        textAlign:
          align === 'end' ? 'right' : align === 'start' ? 'left' : 'center'
      },
      style
    ],
    [syntheticColor, mono, fontSize, italic, align, style]
  );
}
