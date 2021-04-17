import { Linking } from 'react-native';
import { RenderersPropsBase } from '../shared-types';

const defaultRendererProps: Required<RenderersPropsBase> = {
  img: {
    initialDimensions: {
      height: 50,
      width: 50
    },
    enableExperimentalPercentWidth: false
  },
  a: {
    onPress: (_e, href) => Linking.canOpenURL(href) && Linking.openURL(href)
  }
};

export default defaultRendererProps;
