import React, { useEffect, useMemo } from 'react';
import { TDocument } from '@native-html/transient-render-engine';
import { DocumentMetadata, RenderHTMLFragmentProps } from './shared-types';
import DocumentMetadataProvider from './context/DocumentMetadataProvider';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import { defaultMarkers } from './helpers/getMarkersFromTNode';

const TDocumentRenderer = ({
  tdoc,
  baseUrl,
  onDocumentMetadataLoaded
}: {
  tdoc: TDocument;
  baseUrl?: string;
  onDocumentMetadataLoaded?: RenderHTMLFragmentProps['onDocumentMetadataLoaded'];
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const metadata: DocumentMetadata = useMemo(() => {
    const {
      baseHref,
      baseTarget,
      lang,
      links,
      meta,
      title,
      dir
    } = tdoc.context;
    return {
      baseTarget,
      baseUrl: baseUrl ?? baseHref,
      lang,
      dir,
      links,
      meta,
      title
    };
  }, [tdoc.context, baseUrl]);
  useEffect(() => {
    onDocumentMetadataLoaded?.call(null, metadata);
  }, [onDocumentMetadataLoaded, metadata]);
  const parentMarkers = useMemo(
    () => ({
      ...defaultMarkers,
      direction: metadata.dir,
      lang: metadata.lang
    }),
    [metadata.dir, metadata.lang]
  );
  return (
    <DocumentMetadataProvider value={metadata}>
      <TNodeChildrenRenderer parentMarkers={parentMarkers} tnode={tdoc} />
    </DocumentMetadataProvider>
  );
};

export default TDocumentRenderer;
