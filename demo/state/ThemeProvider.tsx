import * as React from 'react';
import {
  DefaultTheme as NavLightTheme,
  DarkTheme as NavDarkTheme
} from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper';
import themeColors, { ColorsShape } from './themeColors';
import componentColors, { ComponentColors } from './componentColors';
import { useColorScheme } from './ColorSchemeProvider';

function mergeTheme(
  paperTheme: typeof PaperDarkTheme,
  navTheme: typeof NavDarkTheme,
  colors: ColorsShape,
  colorSheme: 'dark' | 'light'
) {
  return {
    ...paperTheme,
    ...navTheme,
    colors,
    componentColors: componentColors(colors, colorSheme)
  };
}

const CombinedLightTheme = mergeTheme(
  PaperLightTheme,
  NavLightTheme,
  themeColors.light,
  'light'
);

const CombinedDarkTheme = mergeTheme(
  PaperDarkTheme,
  NavDarkTheme,
  themeColors.dark,
  'dark'
);

const ThemeContext = React.createContext(CombinedLightTheme);

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function useComponentColors<K extends keyof ComponentColors>(
  component: K
) {
  return useTheme().componentColors[component];
}

export function useThemeColors() {
  return useTheme().colors;
}

export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const colorScheme = useColorScheme();
  const selectedTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;
  return (
    <ThemeContext.Provider value={selectedTheme}>
      <PaperProvider theme={selectedTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
