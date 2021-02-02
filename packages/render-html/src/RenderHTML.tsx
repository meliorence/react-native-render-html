import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { RenderResolvedHTMLProps, RenderHTMLProps } from './shared-types';
import useTTree from './hooks/useTTree';
import SharedPropsContext, {
  defaultSharedPropsContext
} from './context/SharedPropsContext';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import RenderHTMLDebug from './RenderHTMLDebug';
import SourceLoader from './SourceLoader';
import RenderRegistryProvider from './context/RenderRegistryProvider';
import TChildrenRenderer from './TChildrenRenderer';
import TDocumentRenderer from './TDocumentRenderer';

export type RenderHTMLPropTypes = Record<keyof RenderHTMLProps, any>;

const propTypes: RenderHTMLPropTypes = {
  renderers: PropTypes.object.isRequired,
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
  enableCSSInlineProcessing: PropTypes.bool,
  enableUserAgentStyles: PropTypes.bool,
  enableExperimentalMarginCollapsing: PropTypes.bool,
  idsStyles: PropTypes.object,
  remoteErrorView: PropTypes.func,
  remoteLoadingView: PropTypes.func,
  ignoredTags: PropTypes.array.isRequired,
  ignoredStyles: PropTypes.array.isRequired,
  allowedStyles: PropTypes.array,
  htmlParserOptions: PropTypes.object,
  debug: PropTypes.bool.isRequired,
  listsPrefixesRenderers: PropTypes.object,
  ignoreDOMNode: PropTypes.func,
  alterDOMData: PropTypes.func,
  alterDOMChildren: PropTypes.func,
  alterDOMElement: PropTypes.func,
  tagsStyles: PropTypes.object,
  classesStyles: PropTypes.object,
  onLinkPress: PropTypes.func,
  computeEmbeddedMaxWidth: PropTypes.func,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  imagesInitialDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  emSize: PropTypes.number.isRequired,
  baseStyle: PropTypes.object,
  renderersProps: PropTypes.object,
  onTTreeChange: PropTypes.func,
  onHTMLLoaded: PropTypes.func,
  systemFonts: PropTypes.arrayOf(PropTypes.string),
  fallbackFonts: PropTypes.shape({
    serif: PropTypes.string,
    'sans-serif': PropTypes.string,
    monospace: PropTypes.string
  }),
  triggerTREInvalidationPropNames: PropTypes.arrayOf(PropTypes.string),
  WebView: PropTypes.any,
  defaultWebViewProps: PropTypes.object,
  onDocumentMetadataLoaded: PropTypes.func
};

const defaultProps: {
  [k in keyof RenderHTMLProps]?: RenderHTMLProps[k];
} = {
  ...defaultSharedPropsContext,
  htmlParserOptions: {
    decodeEntities: true
  },
  emSize: 14,
  ignoredTags: [],
  ignoredStyles: [],
  baseStyle: { fontSize: 14 },
  tagsStyles: {},
  classesStyles: {},
  enableUserAgentStyles: true,
  enableCSSInlineProcessing: true,
  renderers: {},
  fallbackFonts: {
    'sans-serif': Platform.select({ ios: 'system', default: 'sans-serif' }),
    monospace: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    serif: Platform.select({ ios: 'Times New Roman', default: 'serif' })
  },
  systemFonts: Platform.select({
    default: [],
    ios: [
      'San Francisco',
      'Arial',
      'ArialHebrew',
      'Avenir',
      'Baskerville',
      'Bodoni 72',
      'Bradley Hand',
      'Chalkboard SE',
      'Cochin',
      'Copperplate',
      'Courier',
      'Courier New',
      'Damascus',
      'Didot',
      'Futura',
      'Geeza Pro',
      'Georgia',
      'Gill Sans',
      'Helvetica',
      'Helvetica Neue',
      'Hiragino Sans',
      'Hoefler Text',
      'Iowan Old Style',
      'Kailasa',
      'Khmer Sangam MN',
      'Marker Felt',
      'Menlo',
      'Mishafi',
      'Noteworthy',
      'Optima',
      'Palatino',
      'Papyrus',
      'Savoye LET',
      'Symbol',
      'Thonburi',
      'Times New Roman',
      'Trebuchet MS',
      'Verdana',
      'Zapf Dingbats',
      'Zapfino'
    ],
    android: [
      'Roboto',
      'notoserif',
      'sans-serif-light',
      'sans-serif-thin',
      'sans-serif-medium'
    ]
  }),
  triggerTREInvalidationPropNames: [],
  debug: __DEV__
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

export default function RenderHTML({
  defaultTextProps,
  ...props
}: RenderHTMLProps) {
  const normalizedProps = {
    ...props,
    defaultTextProps: { ...defaultProps.defaultTextProps, ...defaultTextProps }
  };
  return (
    <RenderHTMLDebug {...normalizedProps}>
      <RenderRegistryProvider renderers={normalizedProps.renderers}>
        <SharedPropsContext.Provider
          value={normalizedProps as Required<RenderHTMLProps>}>
          <TChildrenRenderersContext.Provider
            value={useMemo(
              () => ({
                TChildrenRenderer,
                TNodeChildrenRenderer
              }),
              []
            )}>
            <SourceLoader {...normalizedProps}>
              {(resolvedProps) => (
                <RenderResolvedHTML {...normalizedProps} {...resolvedProps} />
              )}
            </SourceLoader>
          </TChildrenRenderersContext.Provider>
        </SharedPropsContext.Provider>
      </RenderRegistryProvider>
    </RenderHTMLDebug>
  );
}

RenderHTML.defaultProps = defaultProps;
RenderHTML.propTypes = propTypes;
