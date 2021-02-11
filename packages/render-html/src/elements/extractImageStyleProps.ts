import { ImageStyle } from 'react-native';
import pick from 'ramda/src/pick';

const extractImageStyleProps = pick<keyof ImageStyle>([
  'resizeMode',
  'tintColor',
  'overlayColor'
]);

export default extractImageStyleProps;
