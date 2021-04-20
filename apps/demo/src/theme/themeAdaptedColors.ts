import { Theme as NavTheme } from '@react-navigation/native';
import {
  useTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import colorPrimitivesDeclarations from './colorPrimitivesDeclaration';
import { ColorPrimitivesDeclaration } from './colorSystem';

export type ColorsShape = ReturnType<typeof useTheme>['colors'] &
  NavTheme['colors'];

function deriveThemeFromDeclaration(
  { accent, card, primary, surface, scrim }: ColorPrimitivesDeclaration,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  paperTheme: typeof PaperDarkTheme
): ColorsShape {
  const FIXME = '#594A13';
  return {
    border: FIXME,
    disabled: FIXME,
    error: FIXME,
    notification: FIXME,
    surface: FIXME,
    onSurface: FIXME,
    placeholder: FIXME,
    accent: accent.color,
    backdrop: scrim,
    background: surface.color,
    card: card.color,
    onBackground: surface.content,
    primary: primary.color,
    text: surface.content
  };
}

const themeAdaptedColors: Record<'light' | 'dark', ColorsShape> = {
  light: deriveThemeFromDeclaration(
    colorPrimitivesDeclarations.light,
    PaperDefaultTheme
  ),
  dark: deriveThemeFromDeclaration(
    colorPrimitivesDeclarations.dark,
    PaperDarkTheme
  )
};

export default themeAdaptedColors;
