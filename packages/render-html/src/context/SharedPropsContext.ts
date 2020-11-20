import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { RenderHTMLPassedProps } from '../shared-types';

export const defaultSharedPropsContext: Required<RenderHTMLPassedProps> = {
  debug: false,
  contentWidth: Dimensions.get('window').width,
  staticContentMaxWidth: Dimensions.get('window').width,
  enableExperimentalPercentWidth: false,
  textSelectable: false,
  allowFontScaling: true,
  enableExperimentalMarginCollapsing: false,
  computeImagesMaxWidth: (contentWidth) => contentWidth,
  imagesInitialDimensions: {
    height: 50,
    width: 50
  },
  listsPrefixesRenderers: {},
  onLinkPress: (_e, href) => Linking.canOpenURL(href) && Linking.openURL(href)
};

const SharedPropsContext = React.createContext<RenderHTMLPassedProps>(
  defaultSharedPropsContext
);

export function useSharedProps() {
  return React.useContext(SharedPropsContext);
}

export default SharedPropsContext;
