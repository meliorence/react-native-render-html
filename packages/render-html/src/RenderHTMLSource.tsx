import equals from 'ramda/src/equals';
import React, { memo, ReactElement, useMemo } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ttreeEventsContext from './context/ttreeEventsContext';
import isUriSource from './helpers/isUriSource';
import { SourceLoaderProps, TTreeEvents } from './internal-types';
import {
  RenderHTMLSourceDom,
  RenderHTMLSourceInline,
  RenderHTMLSourceProps,
  RenderHTMLSourceUri
} from './shared-types';
import SourceLoaderUri from './SourceLoaderUri';
import SourceLoaderInline from './SourceLoaderInline';
import SourceLoaderDom from './SourceLoaderDom';
import debugMessage from './debugMessages';
import contentWidthContext from './context/contentWidthContext';
import isDomSource from './helpers/isDomSource';

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

function isEmptySource(
  source:
    | undefined
    | RenderHTMLSourceUri
    | RenderHTMLSourceInline
    | RenderHTMLSourceDom
) {
  return (
    !source ||
    (typeof (source as RenderHTMLSourceUri).uri !== 'string' &&
      typeof (source as RenderHTMLSourceInline).html !== 'string' &&
      !(source as RenderHTMLSourceDom).dom)
  );
}

function RawSourceLoader({
  source,
  ...props
}: SourceLoaderProps): ReactElement | null {
  if (isEmptySource(source)) {
    if (__DEV__) {
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

const RenderHTMLSource = memo(
  function RenderHtmlSource({
    onDocumentMetadataLoaded,
    onTTreeChange,
    contentWidth,
    ...props
  }: RenderHTMLSourceProps) {
    const ttreeEvents: TTreeEvents = useMemo(
      () => ({
        onDocumentMetadataLoaded,
        onTTreeChange
      }),
      [onDocumentMetadataLoaded, onTTreeChange]
    );
    if (__DEV__) {
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
  ({ source: prevSource, ...prev }, { source: currSource, ...curr }) =>
    equals(prevSource, currSource) && equals(prev, curr)
);

(RenderHTMLSource as any).propTypes = renderSourcePropTypes;

export default RenderHTMLSource;
