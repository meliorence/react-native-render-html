import { Linking } from 'react-native';
import { RenderersProps } from '../shared-types';

export async function defaultAOnPress(_e: any, href: string): Promise<unknown> {
  if (await Linking.canOpenURL(href)) {
    return Linking.openURL(href);
  }
}

const defaultRendererProps: Required<RenderersProps> = {
  img: {
    initialDimensions: {
      height: 50,
      width: 50
    },
    enableExperimentalPercentWidth: false
  },
  a: {
    onPress: defaultAOnPress
  },
  ol: {},
  ul: {}
};

export default defaultRendererProps;
