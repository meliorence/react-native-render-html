export type DebugType =
  | 'outdatedUriProp'
  | 'outdatedHtmlProp'
  | 'outdatedListPrefixRenderersProps'
  | 'noSource'
  | 'contentWidth'
  | 'outdatedImagesDimensions'
  | 'outdatedOnLinkPressProp'
  | 'outdatedEnableExperimentalPercentWidth';

let debugMessage: Record<DebugType, string>;

export type DebugMessages = typeof debugMessage;

if (__DEV__) {
  debugMessage = {
    outdatedUriProp:
      "You're attempting to use an outdated prop, 'uri'. This prop has been discontinued in version 6. " +
      "Use 'source={{ uri }}' instead.",
    outdatedHtmlProp:
      "You're attempting to use an outdated prop, 'html'. This prop has been discontinued in version 6. " +
      "Use 'source={{ html }}' instead.",
    outdatedListPrefixRenderersProps:
      "You're attempting to use an outdated prop, 'listPrefixRenderers'. This prop has been discontinued in version 6.",
    noSource: 'No source prop was provided. Nothing will be rendered',
    contentWidth:
      'You should always pass contentWidth prop to properly handle screen rotations ' +
      'and have a seamless support for images scaling. ' +
      'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
      'layout will become inconsistent after screen rotations. ' +
      'You are encouraged to use useWindowDimensions hook, see: ' +
      'https://reactnative.dev/docs/usewindowdimensions',
    outdatedImagesDimensions:
      "You're attempting to use an outdated prop, 'imagesInitialDimensions'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps.img.initialDimensions' instead.",
    outdatedOnLinkPressProp:
      "You're attempting to use an outdated prop, 'onLinkPress'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps.a.onPress' instead.",
    outdatedEnableExperimentalPercentWidth:
      "You're attempting to use an outdated prop, 'enableExperimentalPercentWidth'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps.img.enableExperimentalPercentWidth' instead."
  };
} else {
  debugMessage = {} as any;
}

export default debugMessage;
