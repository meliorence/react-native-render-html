import equals from 'ramda/src/equals';
import React, { memo, ReactElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import ttreeEventsContext from './context/ttreeEventsContext';
import isUriSource from './helpers/isUriSource';
import InlineSourceLoader from './InlineSourceLoader';
import { SourceLoaderProps, TTreeEvents } from './internal-types';
import {
  RenderHTMLSourceInline,
  RenderHTMLSourceProps,
  RenderHTMLSourceUri
} from './shared-types';
import UriSourceLoader from './UriSourceLoader';
import debugMessage from './debugMessages';

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
  onDocumentMetadataLoaded: PropTypes.func
};

function isEmptySource(
  source: undefined | RenderHTMLSourceUri | RenderHTMLSourceInline
) {
  return (
    !source ||
    (typeof (source as RenderHTMLSourceUri).uri !== 'string' &&
      !(source as RenderHTMLSourceInline).html)
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
    return React.createElement(UriSourceLoader, { source, ...props });
  }
  return React.createElement(InlineSourceLoader, { source, ...props });
}

const RenderHTMLSource = memo(
  function RenderHtmlSource({
    onDocumentMetadataLoaded,
    onTTreeChange,
    ...props
  }: RenderHTMLSourceProps) {
    const ttreeEvents: TTreeEvents = useMemo(
      () => ({
        onDocumentMetadataLoaded,
        onTTreeChange
      }),
      [onDocumentMetadataLoaded, onTTreeChange]
    );
    return (
      <ttreeEventsContext.Provider value={ttreeEvents}>
        {React.createElement(RawSourceLoader, props)}
      </ttreeEventsContext.Provider>
    );
  },
  ({ source: prevSource, ...prev }, { source: currSource, ...curr }) =>
    equals(prevSource, currSource) && equals(prev, curr)
);

(RenderHTMLSource as any).propTypes = renderSourcePropTypes;

export default RenderHTMLSource;
