import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  RenderResolvedHTMLProps,
  ResolvedResourceProps,
  RenderHTMLFragmentProps
} from './shared-types';
import useTTree from './hooks/useTTree';
import SharedPropsContext, {
  defaultSharedPropsContext
} from './context/SharedPropsContext';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import RenderHTMLFragmentDebug from './RenderHTMLFragmentDebug';
import SourceLoader from './SourceLoader';
import TChildrenRenderer from './TChildrenRenderer';
import TDocumentRenderer from './TDocumentRenderer';
import selectSharedProps from './helpers/selectSharedProps';

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
  listsPrefixesRenderers: PropTypes.object,
  onLinkPress: PropTypes.func,
  computeEmbeddedMaxWidth: PropTypes.func,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  imagesInitialDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  renderersProps: PropTypes.object,
  onTTreeChange: PropTypes.func,
  onHTMLLoaded: PropTypes.func,
  WebView: PropTypes.any,
  defaultWebViewProps: PropTypes.object
};

export const renderHTMLFragmentDefaultProps: {
  [k in keyof RenderHTMLFragmentProps]?: RenderHTMLFragmentProps[k];
} = {
  ...defaultSharedPropsContext,
  contentWidth: undefined
};

function RenderResolvedHTML(props: RenderResolvedHTMLProps) {
  const ttree = useTTree(props);
  return (
    <TDocumentRenderer
      tdoc={ttree}
      baseUrl={props.baseUrl}
      onDocumentMetadataLoaded={props.onDocumentMetadataLoaded}
    />
  );
}

const renderResolved = (resolvedProps: ResolvedResourceProps) => (
  <RenderResolvedHTML {...resolvedProps} />
);

/**
 * Render a HTML snippet, given that there is a `TRenderEngineProvider` up in
 * the render tree.
 *
 * @param props - Props for this component.
 */
export default function RenderHTMLFragment(props: RenderHTMLFragmentProps) {
  const {
    source,
    onHTMLLoaded,
    remoteErrorView,
    remoteLoadingView,
    ...remainingProps
  } = props;
  const sourceLoaderProps = {
    source,
    onHTMLLoaded,
    remoteErrorView,
    remoteLoadingView,
    children: renderResolved
  };
  return (
    <RenderHTMLFragmentDebug {...props}>
      <SharedPropsContext.Provider value={selectSharedProps(remainingProps)}>
        <TChildrenRenderersContext.Provider
          value={useMemo(
            () => ({
              TChildrenRenderer,
              TNodeChildrenRenderer
            }),
            []
          )}>
          {React.createElement(SourceLoader, sourceLoaderProps)}
        </TChildrenRenderersContext.Provider>
      </SharedPropsContext.Provider>
    </RenderHTMLFragmentDebug>
  );
}

RenderHTMLFragment.defaultProps = renderHTMLFragmentDefaultProps;
RenderHTMLFragment.propTypes = renderHtmlFragmentPropTypes;
