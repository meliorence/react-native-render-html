import Color from 'color';

function shiftColor(color: string, ratio: number): string;
function shiftColor(
  color: string,
  ratioDark: number,
  ratioLight: number
): string;

function shiftColor(
  color: string,
  ratioDarkOrBoth: number,
  ratioLight?: number
) {
  const c = Color(color);
  if (c.isDark()) {
    return c.lighten(ratioDarkOrBoth).hex();
  }
  return c.darken(ratioLight ?? ratioDarkOrBoth).hex();
}

export default shiftColor;
