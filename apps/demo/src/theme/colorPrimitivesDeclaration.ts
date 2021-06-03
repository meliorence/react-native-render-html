import Color from 'color';
import { ColorPrimitive } from '../substratum';
import alphaMixColor from './alphaMixColor';
import { ColorPrimitivesDeclaration } from './colorSystem';
import shiftColor from './shiftColor';

const black = 'rgb(25, 25, 48)';
const white = 'rgb(230, 230, 230)';

export type CreateColorPrimitivesSpec = Omit<
  ColorPrimitivesDeclaration,
  'placeholder' | 'primaryVariant' | 'accentVariant' | 'scrim'
>;

const darkBlue = 'rgb(0,0,48)';

const heading: ColorPrimitive = {
  color: white,
  content: darkBlue
};

function createColorPrimitives({
  primary,
  accent,
  surface,
  card,
  apiRef
}: CreateColorPrimitivesSpec): ColorPrimitivesDeclaration {
  return {
    primary,
    heading,
    accent,
    apiRef,
    accentVariant: {
      color: shiftColor(accent.color, 0.5),
      content: primary.content
    },
    surface,
    card,
    placeholder: 'gray',
    scrim: alphaMixColor(surface.content, 0.7, surface.color)
  };
}

const dark: ColorPrimitivesDeclaration = createColorPrimitives({
  primary: {
    color: darkBlue,
    content: white
  },
  heading,
  accent: {
    color: '#8181ff',
    content: black
  },
  surface: {
    color: black,
    content: white
  },
  card: {
    color: darkBlue,
    content: white
  },
  apiRef: {
    color: '#bed4eb10',
    content: '#4377e7'
  }
});

const light: ColorPrimitivesDeclaration = createColorPrimitives({
  primary: {
    color: darkBlue,
    content: white
  },
  heading,
  accent: {
    color: '#8181ff',
    content: white
  },
  surface: {
    color: Color('#546e7a').lighten(1.4).string(),
    content: black
  },
  card: {
    color: darkBlue,
    content: white
  },
  apiRef: {
    color: '#1c1e2010',
    content: '#4377e7'
  }
});

export { dark, light };

const colorPrimitivesDeclarations = {
  light,
  dark
};

export default colorPrimitivesDeclarations;
