import { Linking } from 'react-native';
import { RenderersProps } from '../shared-types';

const defaultRendererProps: Required<RenderersProps> = {
  img: {
    initialDimensions: {
      height: 50,
      width: 50
    },
    enableExperimentalPercentWidth: false
  },
  a: {
    onPress: (_e, href) => Linking.canOpenURL(href) && Linking.openURL(href)
  },
  ol: {},
  ul: {}
};

export default defaultRendererProps;
