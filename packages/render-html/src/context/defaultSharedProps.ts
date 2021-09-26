import { DEFAULT_PRESSABLE_RIPPLE_COLOR } from '../constants';
import { RenderHTMLAmbiantSharedProps } from '../shared-types';

function WebViewPlaceholder() {
  /* istanbul ignore else */
  if (typeof __DEV__ === 'boolean' && __DEV__) {
    console.warn(
      'One of your renderers is attempting to use WebView component, which has not been ' +
        "provided as a prop to the RenderHtml component. As a consequence, the element won't be rendered."
    );
  }
  return null;
}

const defaultSharedProps: RenderHTMLAmbiantSharedProps = {
  bypassAnonymousTPhrasingNodes: true,
  debug: false,
  defaultTextProps: {
    selectable: false,
    allowFontScaling: true
  },
  defaultViewProps: {},
  enableExperimentalBRCollapsing: false,
  enableExperimentalGhostLinesPrevention: false,
  enableExperimentalMarginCollapsing: false,
  computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
  WebView: WebViewPlaceholder,
  defaultWebViewProps: {},
  pressableHightlightColor: DEFAULT_PRESSABLE_RIPPLE_COLOR,
  provideEmbeddedHeaders: undefined,
  GenericPressable: undefined,
  customListStyleSpecs: undefined
};

export default defaultSharedProps;
