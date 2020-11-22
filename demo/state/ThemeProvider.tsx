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
import componentColors from './componentColors';
import { useColorScheme } from './ColorSchemeProvider';

function mergeTheme(
  paperTheme: typeof PaperDarkTheme,
  navTheme: typeof NavDarkTheme,
  colors: ColorsShape
) {
  return {
    ...paperTheme,
    ...navTheme,
    colors,
    componentColors: componentColors(colors)
  };
}

const CombinedLightTheme = mergeTheme(
  PaperLightTheme,
  NavLightTheme,
  themeColors.light
);

const CombinedDarkTheme = mergeTheme(
  PaperDarkTheme,
  NavDarkTheme,
  themeColors.dark
);

const ThemeContext = React.createContext(CombinedLightTheme);

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function useComponentColors() {
  return useTheme().componentColors;
}

export function useThemeColors() {
  return useTheme().colors;
}

export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const { colorScheme } = useColorScheme();
  const selectedTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;
  return (
    <ThemeContext.Provider value={selectedTheme}>
      <PaperProvider theme={selectedTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
