import React from 'react';
import { OpaqueColorValue } from 'react-native';
import textColorContext from '../../state/textColorContext';
import { useThemeColors } from '../../state/ThemeProvider';

export default function useNuclearTextColor(color?: string | OpaqueColorValue) {
  const inheritedColor = React.useContext(textColorContext);
  const { text } = useThemeColors();
  return color ?? inheritedColor ?? text;
}
