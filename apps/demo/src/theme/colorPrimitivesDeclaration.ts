import Color from 'color';
import alphaMixColor from './alphaMixColor';
import { ColorPrimitivesDeclaration } from './colorSystem';
import shiftColor from './shiftColor';

const black = 'rgb(20, 20, 20)';
const white = 'rgb(230, 230, 230)';

export type CreateColorPrimitivesSpec = Omit<
  ColorPrimitivesDeclaration,
  'card' | 'placeholder' | 'primaryVariant' | 'accentVariant' | 'scrim'
>;

function createColorPrimitives({
  primary,
  accent,
  surface
}: CreateColorPrimitivesSpec): ColorPrimitivesDeclaration {
  const cardBackground = shiftColor(surface.color, 2, 0.05);
  const cardOnBackground = surface.content;
  return {
    primary,
    primaryVariant: {
      color: shiftColor(primary.color, 0.2),
      content: primary.content
    },
    accent,
    accentVariant: {
      color: shiftColor(accent.color, 0.2),
      content: primary.content
    },
    surface,
    card: {
      color: cardBackground,
      content: cardOnBackground
    },
    placeholder: 'gray',
    scrim: alphaMixColor(surface.content, 0.7, surface.color)
  };
}

const dark: ColorPrimitivesDeclaration = createColorPrimitives({
  primary: {
    color: '#29434e',
    content: white
  },
  accent: {
    color: '#26c6da',
    content: white
  },
  surface: {
    color: black,
    content: white
  }
});

const light: ColorPrimitivesDeclaration = createColorPrimitives({
  primary: {
    color: '#546e7a',
    content: white
  },
  accent: {
    color: '#26c6da',
    content: white
  },
  surface: {
    color: Color('#546e7a').lighten(1.4).string(),
    content: black
  }
});

export { dark, light };

const colorPrimitivesDeclarations = {
  light,
  dark
};

export default colorPrimitivesDeclarations;
