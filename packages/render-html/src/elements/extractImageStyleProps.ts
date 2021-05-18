import { ImageStyle } from 'react-native';
import { WebBlockStyles } from '@native-html/transient-render-engine';

import pick from 'ramda/src/pick';

const extractProps = pick<keyof ImageStyle>([
  'resizeMode',
  'tintColor',
  'overlayColor'
]);

function mapObjectFit(objectFit: WebBlockStyles['objectFit']) {
  let resizeMode: ImageStyle['resizeMode'];
  switch (objectFit) {
    case 'contain':
    case 'cover':
      resizeMode = objectFit;
      break;
    case 'fill':
      resizeMode = 'stretch';
      break;
    case 'scale-down':
      resizeMode = 'contain';
      break;
    default:
      return null;
  }
  return { resizeMode };
}

function extractImageStyleProps(
  style: any,
  objectFit?: WebBlockStyles['objectFit']
) {
  const resizeModeFromFit = objectFit ? mapObjectFit(objectFit) : null;
  return {
    ...extractProps(style),
    ...resizeModeFromFit
  };
}

export default extractImageStyleProps;
