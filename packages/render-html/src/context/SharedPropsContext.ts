import React, { useCallback } from 'react';
import { Dimensions, Linking, TextProps } from 'react-native';
import { RenderHTMLPassedProps } from '../shared-types';

export const defaultSharedPropsContext: Required<RenderHTMLPassedProps> = {
  debug: false,
  contentWidth: Dimensions.get('window').width,
  enableExperimentalPercentWidth: false,
  defaultTextProps: {
    selectable: false,
    allowFontScaling: true
  },
  enableExperimentalMarginCollapsing: false,
  computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
  imagesInitialDimensions: {
    height: 50,
    width: 50
  },
  listsPrefixesRenderers: {},
  onLinkPress: (_e, href) => Linking.canOpenURL(href) && Linking.openURL(href),
  WebView: () => null,
  defaultWebViewProps: {}
};

const SharedPropsContext = React.createContext<Required<RenderHTMLPassedProps>>(
  defaultSharedPropsContext
);

export function useSharedProps() {
  return React.useContext(SharedPropsContext);
}

export function useDefaultTextProps(): TextProps {
  return useSharedProps().defaultTextProps;
}

export function useComputeMaxWidthForTag(tagName: string) {
  const { computeEmbeddedMaxWidth } = useSharedProps();
  return useCallback(
    (cw: number) => {
      return computeEmbeddedMaxWidth(cw, tagName);
    },
    [computeEmbeddedMaxWidth, tagName]
  );
}

export default SharedPropsContext;
