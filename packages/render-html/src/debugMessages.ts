export type DebugType =
  | 'noSource'
  | 'contentWidth'
  | 'outdatedUriProp'
  | 'outdatedHtmlProp'
  | 'outdatedListPrefixRenderersProps'
  | 'outdatedImagesDimensions'
  | 'outdatedOnLinkPressProp'
  | 'outdatedEnableExperimentalPercentWidth'
  | 'outdatedIgnoreNodesFunction'
  | 'outdatedAlterNode'
  | 'outdatedAlterChildren'
  | 'outdatedAlterData'
  | 'outdatedComputeImagesMaxWidth'
  | 'outdatedTriggerTREInvalidation';

let debugMessage: Record<DebugType, string>;

export type DebugMessages = typeof debugMessage;
/* istanbul ignore next */
if (typeof __DEV__ === 'boolean' && __DEV__) {
  debugMessage = {
    outdatedComputeImagesMaxWidth:
      "You're attempting to use an outdated prop, 'computeImagesMaxWidth'. This prop has been replaced in version 6 with 'computeEmbeddedMaxWidth'.",
    outdatedAlterChildren:
      "You're attempting to use an outdated prop, 'alterChildren'. This prop has been discontinued in version 6. " +
      "Use 'domVisitors={{ onElement }}' instead, and tamper the children manually from here. Use 'domutils' package for easy DOM manipulation.",
    outdatedAlterData:
      "You're attempting to use an outdated prop, 'alterData'. This prop has been discontinued in version 6. " +
      "Use 'domVisitors={{ onText }}' instead, and tamper the node data field manually from here.",
    outdatedAlterNode:
      "You're attempting to use an outdated prop, 'alterNode'. This prop has been discontinued in version 6. " +
      "Use 'domVisitors={{ onElement }}' instead, and tamper the node manually from here. Use 'domutils' package for easy DOM manipulation.",
    outdatedIgnoreNodesFunction:
      "You're attempting to use an outdated prop, 'ignoreNodesFunction'. This prop has been replaced in version 6 with 'ignoreDomNode'.",
    outdatedUriProp:
      "You're attempting to use an outdated prop, 'uri'. This prop has been discontinued in version 6. " +
      "Use 'source={{ uri }}' instead.",
    outdatedHtmlProp:
      "You're attempting to use an outdated prop, 'html'. This prop has been discontinued in version 6. " +
      "Use 'source={{ html }}' instead.",
    outdatedListPrefixRenderersProps:
      "You're attempting to use an outdated prop, 'listPrefixRenderers'. This prop has been discontinued in version 6. " +
      "Use 'customListStyleSpecs' instead.",
    outdatedImagesDimensions:
      "You're attempting to use an outdated prop, 'imagesInitialDimensions'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps={{ img: { initialDimensions } }}' instead.",
    outdatedOnLinkPressProp:
      "You're attempting to use an outdated prop, 'onLinkPress'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps={{ a: { onPress } }}' instead.",
    outdatedEnableExperimentalPercentWidth:
      "You're attempting to use an outdated prop, 'enableExperimentalPercentWidth'. This prop has been discontinued in version 6. " +
      "Use 'renderersProps={{ img: { enableExperimentalPercentWidth } }}' instead.",
    outdatedTriggerTREInvalidation:
      "You're attempting to use an outdated prop, 'triggerTREInvalidationPropsNames'. This prop has been discontinued in v6.0.0-beta.3. " +
      'From now-on, every prop sent to the TRenderEngineProvider is hot by default.',
    noSource: 'No source prop was provided. Nothing will be rendered',
    contentWidth:
      'You should always pass contentWidth prop to properly handle screen rotations ' +
      'and have a seamless support for images scaling. ' +
      'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
      'layout will become inconsistent after screen rotations. ' +
      'You are encouraged to use useWindowDimensions hook, see: ' +
      'https://reactnative.dev/docs/usewindowdimensions'
  };
} else {
  debugMessage = null as any;
}

export default debugMessage;
