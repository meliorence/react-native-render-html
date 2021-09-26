import equals from 'ramda/src/equals';
import React, { memo, ReactElement, useMemo } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ttreeEventsContext from './context/ttreeEventsContext';
import isUriSource from './helpers/isUriSource';
import { SourceLoaderProps, TTreeEvents } from './internal-types';
import {
  HTMLSourceDom,
  HTMLSourceInline,
  RenderHTMLSourceProps,
  HTMLSourceUri,
  HTMLSource
} from './shared-types';
import SourceLoaderUri from './SourceLoaderUri';
import SourceLoaderInline from './SourceLoaderInline';
import SourceLoaderDom from './SourceLoaderDom';
import debugMessage from './debugMessages';
import contentWidthContext from './context/contentWidthContext';
import isDomSource from './helpers/isDomSource';
import useProfiler from './hooks/useProfiler';

export type RenderHTMLSourcePropTypes = Record<
  keyof RenderHTMLSourceProps,
  any
>;

export const renderSourcePropTypes: RenderHTMLSourcePropTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      html: PropTypes.string.isRequired,
      baseUrl: PropTypes.string
    }),
    PropTypes.shape({
      dom: PropTypes.object.isRequired,
      baseUrl: PropTypes.string
    }),
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
      method: PropTypes.string,
      body: PropTypes.any,
      headers: PropTypes.object
    })
  ]),
  onTTreeChange: PropTypes.func,
  onHTMLLoaded: PropTypes.func,
  onDocumentMetadataLoaded: PropTypes.func,
  contentWidth: PropTypes.number
};

function isEmptySource(source: undefined | HTMLSource) {
  return (
    !source ||
    (typeof (source as HTMLSourceUri).uri !== 'string' &&
      typeof (source as HTMLSourceInline).html !== 'string' &&
      !(source as HTMLSourceDom).dom)
  );
}

function RawSourceLoader({
  source,
  ...props
}: SourceLoaderProps): ReactElement | null {
  if (isEmptySource(source)) {
    /* istanbul ignore next */
    if (typeof __DEV__ === 'boolean' && __DEV__) {
      console.warn(debugMessage.noSource);
    }
    return null;
  }
  if (isUriSource(source)) {
    return React.createElement(SourceLoaderUri, { source, ...props });
  }
  if (isDomSource(source)) {
    return React.createElement(SourceLoaderDom, { source, ...props });
  }
  return React.createElement(SourceLoaderInline, { source, ...props });
}

// check if for each key of two objects, the values are equal
function shallowEqual(prop1: any, prop2: any) {
  if (!equals(Object.keys(prop1), Object.keys(prop2))) {
    return false;
  }
  for (const key in prop1) {
    if (prop1[key] !== prop2[key]) {
      return false;
    }
  }
  return true;
}

/**
 * A React component to render HTML snippets.
 *
 * @remarks This component is useful when you have to load dozens of HTML
 * snippets with the same config. Performance is expected to improve in such
 * scenarios.
 *
 * @warning This component requires to have {@link TRenderEngineProvider}
 * and {@link RenderHTMLConfigProvider} as parents.
 */
const RenderHTMLSource = memo(
  function RenderHtmlSource({
    onDocumentMetadataLoaded,
    onTTreeChange,
    contentWidth,
    ...props
  }: RenderHTMLSourceProps) {
    const profile = useProfiler({
      prop: 'onDocumentMetadataLoaded or onTTreeChange'
    });
    const ttreeEvents: TTreeEvents = useMemo(() => {
      typeof __DEV__ === 'boolean' && __DEV__ && profile();
      return {
        onDocumentMetadataLoaded,
        onTTreeChange
      };
    }, [onDocumentMetadataLoaded, onTTreeChange, profile]);
    if (typeof __DEV__ === 'boolean' && __DEV__) {
      if (!(typeof contentWidth === 'number')) {
        console.warn(debugMessage.contentWidth);
      }
    }
    return (
      <ttreeEventsContext.Provider value={ttreeEvents}>
        <contentWidthContext.Provider
          value={contentWidth || Dimensions.get('window').width}>
          {React.createElement(RawSourceLoader, props)}
        </contentWidthContext.Provider>
      </ttreeEventsContext.Provider>
    );
  },
  ({ source: prevSource, ...prev }, { source: currSource, ...curr }) => {
    return shallowEqual(prevSource, currSource) && shallowEqual(prev, curr);
  }
);

/**
 * @ignore
 */
(RenderHTMLSource as any).propTypes = renderSourcePropTypes;

export default RenderHTMLSource;
