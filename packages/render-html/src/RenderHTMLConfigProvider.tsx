import React, { PropsWithChildren, useMemo } from 'react';
import PropTypes from 'prop-types';
import RenderersPropsProvider from './context/RenderersPropsProvider';
import SharedPropsProvider from './context/SharedPropsProvider';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import { RenderHTMLConfig, RenderersPropsBase } from './shared-types';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import TChildrenRenderer from './TChildrenRenderer';
import sourceLoaderContext from './context/sourceLoaderContext';
import debugMessage from './debugMessages';

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
  setMarkersForTNode: PropTypes.func,
  pressableHightlightColor: PropTypes.string,
  customListStyleSpecs: PropTypes.object
};

export default function RenderHTMLConfigProvider<
  P extends RenderersPropsBase = RenderersPropsBase
>(props: PropsWithChildren<RenderHTMLConfig<P>>) {
  const {
    remoteErrorView,
    remoteLoadingView,
    renderersProps,
    debug,
    children,
    ...sharedProps
  } = props;
  const sourceLoaderConfig = useMemo(
    () => ({
      remoteErrorView,
      remoteLoadingView
    }),
    [remoteErrorView, remoteLoadingView]
  );
  if (__DEV__) {
    if (!('contentWidth' in props)) {
      console.warn(debugMessage.contentWidth);
    }
  }
  return (
    <SharedPropsProvider {...sharedProps}>
      <RenderersPropsProvider renderersProps={renderersProps}>
        <TChildrenRenderersContext.Provider value={childrenRendererContext}>
          <sourceLoaderContext.Provider value={sourceLoaderConfig}>
            {children}
          </sourceLoaderContext.Provider>
        </TChildrenRenderersContext.Provider>
      </RenderersPropsProvider>
    </SharedPropsProvider>
  );
}

RenderHTMLConfigProvider.propTypes = renderHTMLConfigPropTypes;
