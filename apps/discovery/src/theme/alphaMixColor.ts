import Color from 'color';

export default function alphaMixColor(
  color: string,
  alpha: number,
  background = 'white'
) {
  return Color(color).alpha(alpha).mix(Color(background)).hex();
}
