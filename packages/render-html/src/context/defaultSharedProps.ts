import { DEFAULT_PRESSABLE_RIPPLE_COLOR } from '../constants';
import { RenderHTMLSharedProps } from '../shared-types';

function WebViewPlaceholder() {
  /* istanbul ignore next */
  if (__DEV__) {
    console.warn(
      'One of your renderers is attempting to use WebView component, which has not been ' +
        "provided as a prop to the RenderHtml component. As a consequence, the element won't be rendered."
    );
  }
  /* istanbul ignore next */
  return null;
}

const defaultSharedProps: Required<RenderHTMLSharedProps> = {
  debug: false,
  defaultTextProps: {
    selectable: false,
    allowFontScaling: true
  },
  defaultViewProps: {},
  enableExperimentalMarginCollapsing: false,
  computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
  GenericPressable: undefined as any,
  WebView: WebViewPlaceholder,
  defaultWebViewProps: {},
  pressableHightlightColor: DEFAULT_PRESSABLE_RIPPLE_COLOR,
  customListStyleSpecs: {}
};

export default defaultSharedProps;
