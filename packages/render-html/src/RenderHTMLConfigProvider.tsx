import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import RenderersPropsProvider from './context/RenderersPropsProvider';
import SharedPropsProvider from './context/SharedPropsProvider';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import { RenderHTMLConfig } from './shared-types';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import TChildrenRenderer from './TChildrenRenderer';
import sourceLoaderContext, {
  defaultRenderError,
  defaultRenderLoading
} from './context/sourceLoaderContext';
import RenderRegistryProvider from './context/RenderRegistryProvider';
import { useAmbientTRenderEngine } from './TRenderEngineProvider';

const childrenRendererContext = {
  TChildrenRenderer,
  TNodeChildrenRenderer
};

export type RenderHTMLConfigPropTypes = Record<keyof RenderHTMLConfig, any>;

export const renderHTMLConfigPropTypes: RenderHTMLConfigPropTypes = {
  defaultTextProps: PropTypes.object,
  defaultViewProps: PropTypes.object,
  enableExperimentalMarginCollapsing: PropTypes.bool,
  remoteErrorView: PropTypes.func,
  remoteLoadingView: PropTypes.func,
  debug: PropTypes.bool,
  computeEmbeddedMaxWidth: PropTypes.func,
  renderersProps: PropTypes.object,
  WebView: PropTypes.any,
  GenericPressable: PropTypes.any,
  defaultWebViewProps: PropTypes.object,
  pressableHightlightColor: PropTypes.string,
  customListStyleSpecs: PropTypes.object,
  renderers: PropTypes.object
};

/**
 * A component to provide configuration for {@link RenderHTMLSource}
 * descendants, to be used in conjunction with {@link TRenderEngineProvider}.
 */
export default function RenderHTMLConfigProvider(
  props: PropsWithChildren<RenderHTMLConfig>
): ReactElement {
  const {
    remoteErrorView,
    remoteLoadingView,
    renderersProps,
    debug,
    children,
    renderers,
    ...sharedProps
  } = props;
  const engine = useAmbientTRenderEngine();
  const sourceLoaderConfig = useMemo(
    () => ({
      remoteErrorView: remoteErrorView || defaultRenderError,
      remoteLoadingView: remoteLoadingView || defaultRenderLoading
    }),
    [remoteErrorView, remoteLoadingView]
  );
  return (
    <RenderRegistryProvider
      renderers={renderers}
      elementModels={engine.getHTMLElementsModels()}>
      <SharedPropsProvider {...sharedProps}>
        <RenderersPropsProvider renderersProps={renderersProps}>
          <TChildrenRenderersContext.Provider value={childrenRendererContext}>
            <sourceLoaderContext.Provider value={sourceLoaderConfig}>
              {children}
            </sourceLoaderContext.Provider>
          </TChildrenRenderersContext.Provider>
        </RenderersPropsProvider>
      </SharedPropsProvider>
    </RenderRegistryProvider>
  );
}

/**
 * @ignore
 */
RenderHTMLConfigProvider.propTypes = renderHTMLConfigPropTypes;
