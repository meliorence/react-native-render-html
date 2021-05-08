import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { RenderHTMLFragmentProps } from './shared-types';
import { DOMProps, SourceLoaderProps } from './internal-types';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import RenderHTMLFragmentDebug from './RenderHTMLFragmentDebug';
import SourceLoader from './SourceLoader';
import TChildrenRenderer from './TChildrenRenderer';
import SharedPropsProvider from './context/SharedPropsProvider';
import defaultSharedProps from './context/defaultSharedProps';
import RenderersPropsProvider from './context/RenderersPropsProvider';
import domContext from './context/domContext';

export type RenderHTMLFragmentPropTypes = Record<
  keyof RenderHTMLFragmentProps,
  any
>;

export const renderHtmlFragmentPropTypes: RenderHTMLFragmentPropTypes = {
  defaultTextProps: PropTypes.object,
  defaultViewProps: PropTypes.object,
  source: PropTypes.oneOfType([
    PropTypes.shape({
      html: PropTypes.string.isRequired,
      baseUrl: PropTypes.string
    }),
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
      method: PropTypes.string,
      body: PropTypes.any,
      headers: PropTypes.object
    })
  ]),
  enableExperimentalMarginCollapsing: PropTypes.bool,
  remoteErrorView: PropTypes.func,
  remoteLoadingView: PropTypes.func,
  debug: PropTypes.bool.isRequired,
  computeEmbeddedMaxWidth: PropTypes.func,
  contentWidth: PropTypes.number,
  renderersProps: PropTypes.object,
  onTTreeChange: PropTypes.func,
  onHTMLLoaded: PropTypes.func,
  WebView: PropTypes.any,
  GenericPressable: PropTypes.any,
  defaultWebViewProps: PropTypes.object,
  setMarkersForTNode: PropTypes.func,
  onDocumentMetadataLoaded: PropTypes.func,
  pressableHightlightColor: PropTypes.string,
  customListStyleSpecs: PropTypes.object
};

export const renderHTMLFragmentDefaultProps: {
  [k in keyof RenderHTMLFragmentProps]?: RenderHTMLFragmentProps[k];
} = {
  ...defaultSharedProps,
  contentWidth: undefined
};

const childrenRendererContext = {
  TChildrenRenderer,
  TNodeChildrenRenderer
};

/**
 * Render a HTML snippet, given that there is a `TRenderEngineProvider` up in
 * the render tree.
 *
 * @param props - Props for this component.
 *
 * @public
 */
export default function RenderHTMLFragment(props: RenderHTMLFragmentProps) {
  const {
    source,
    onHTMLLoaded,
    onTTreeChange,
    remoteErrorView,
    remoteLoadingView,
    onDocumentMetadataLoaded,
    renderersProps,
    debug,
    ...sharedProps
  } = props;
  const domProps: DOMProps = useMemo(
    () => ({
      debug,
      onDocumentMetadataLoaded,
      onTTreeChange
    }),
    [debug, onDocumentMetadataLoaded, onTTreeChange]
  );
  const sourceLoaderProps: SourceLoaderProps = {
    source,
    onHTMLLoaded,
    remoteErrorView,
    remoteLoadingView
  };
  return (
    <RenderHTMLFragmentDebug {...props}>
      <domContext.Provider value={domProps}>
        <SharedPropsProvider {...sharedProps}>
          <RenderersPropsProvider renderersProps={renderersProps}>
            <TChildrenRenderersContext.Provider value={childrenRendererContext}>
              {React.createElement(SourceLoader, sourceLoaderProps)}
            </TChildrenRenderersContext.Provider>
          </RenderersPropsProvider>
        </SharedPropsProvider>
      </domContext.Provider>
    </RenderHTMLFragmentDebug>
  );
}

RenderHTMLFragment.defaultProps = renderHTMLFragmentDefaultProps;
RenderHTMLFragment.propTypes = renderHtmlFragmentPropTypes;
