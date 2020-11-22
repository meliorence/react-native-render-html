import { Theme as NavTheme } from '@react-navigation/native';
import {
  useTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';

const cardDark = 'rgb(50, 50, 50)';
const cardLight = 'rgb(235, 235, 235)';

const baseColorsDark = {
  primary: '#29434e',
  accent: '#26c6da'
};

const baseColorsLight = {
  primary: '#546e7a',
  accent: '#26c6da'
};

export type ColorsShape = ReturnType<typeof useTheme>['colors'] &
  NavTheme['colors'] & {
    onPrimary: string;
  };

const themeColors: Record<'light' | 'dark', ColorsShape> = {
  light: {
    ...PaperDefaultTheme.colors,
    ...baseColorsLight,
    text: 'black',
    onPrimary: '#eee',
    background: '#fff',
    border: 'gray',
    card: cardLight,
    notification: cardDark
  },
  dark: {
    ...PaperDarkTheme.colors,
    ...baseColorsDark,
    text: '#fff',
    onPrimary: '#fff',
    background: 'rgb(20, 20, 20)',
    border: 'gray',
    card: cardDark,
    notification: cardLight
  }
};

export default themeColors;
