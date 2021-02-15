import React, { useCallback } from 'react';
import { Dimensions, Linking, TextProps, ViewProps } from 'react-native';
import { RenderHTMLSharedProps, TRendererBaseProps } from '../shared-types';

export const defaultSharedPropsContext: Required<RenderHTMLSharedProps> = {
  debug: false,
  contentWidth: Dimensions.get('window').width,
  enableExperimentalPercentWidth: false,
  defaultTextProps: {
    selectable: false,
    allowFontScaling: true
  },
  defaultViewProps: {},
  enableExperimentalMarginCollapsing: false,
  computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
  imagesInitialDimensions: {
    height: 50,
    width: 50
  },
  onLinkPress: (_e, href) => Linking.canOpenURL(href) && Linking.openURL(href),
  WebView: () => {
    if (__DEV__) {
      console.warn(
        'One of your renderer is attempting to use WebView component, which has not been ' +
          "provided as a prop to the RenderHtml component. As a consequence, the element won't be rendered."
      );
    }
    return null;
  },
  defaultWebViewProps: {},
  renderersProps: {}
};

const SharedPropsContext = React.createContext<Required<RenderHTMLSharedProps>>(
  defaultSharedPropsContext
);

export function useSharedProps<
  RendererProps extends Record<string, any> = Record<string, any>
>() {
  return React.useContext(SharedPropsContext) as Required<
    RenderHTMLSharedProps<RendererProps>
  >;
}

export function useRendererProps<
  RendererProps extends Record<string, any> = Record<string, any>,
  K extends keyof RendererProps = any
>(k: K) {
  return useSharedProps<RendererProps>().renderersProps[k];
}

export function useDefaultContainerProps(): Pick<
  TRendererBaseProps<any>,
  'viewProps' | 'textProps'
> {
  const sharedProps = useSharedProps();
  return {
    viewProps: {
      ...defaultSharedPropsContext.defaultViewProps,
      ...sharedProps.defaultViewProps
    },
    textProps: {
      ...defaultSharedPropsContext.defaultTextProps,
      ...sharedProps.defaultTextProps
    }
  };
}
export function useDefaultTextProps(): TextProps {
  return {
    ...defaultSharedPropsContext.defaultTextProps,
    ...useSharedProps().defaultTextProps
  };
}

export function useDefaultViewProps(): ViewProps {
  return {
    ...defaultSharedPropsContext.defaultViewProps,
    ...useSharedProps().defaultViewProps
  };
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
