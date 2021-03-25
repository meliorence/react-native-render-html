import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Platform } from 'react-native';
import textColorContext from '../state/textColorContext';
import { useThemeColors } from '../state/ThemeProvider';

export interface AtomicTextStyle {
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

export default function useAtomicTextStyle(props?: AtomicTextStyle) {
  const { color, style, mono, italic, align = 'start', fontSize = 'normal' } =
    props || {};
  const inheritedColor = React.useContext(textColorContext);
  const { text } = useThemeColors();
  return React.useMemo<StyleProp<TextStyle>>(
    () => [
      {
        color: color ?? inheritedColor ?? text,
        fontFamily: mono ? MONO : undefined,
        fontSize: fontSize === 'normal' ? 16 : fontSize === 'big' ? 25 : 11,
        fontStyle: italic ? 'italic' : 'normal',
        textAlign:
          align === 'end' ? 'right' : align === 'start' ? 'left' : 'center'
      },
      style
    ],
    [color, inheritedColor, text, mono, fontSize, italic, align, style]
  );
}
