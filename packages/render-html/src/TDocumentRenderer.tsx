import React, { useEffect, useMemo } from 'react';
import { TDocument } from '@native-html/transient-render-engine';
import { DocumentMetadata, TransientRenderEngineConfig } from './shared-types';
import DocumentMetadataProvider from './context/DocumentMetadataProvider';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';

const TDocumentRenderer = ({
  tdoc,
  baseUrl,
  onDocumentMetadataLoaded
}: {
  tdoc: TDocument;
  baseUrl?: string;
  onDocumentMetadataLoaded?: TransientRenderEngineConfig['onDocumentMetadataLoaded'];
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const metadata: DocumentMetadata = useMemo(() => {
    const { baseHref, baseTarget, lang, links, meta, title } = tdoc.context;
    return {
      baseTarget,
      baseUrl: baseUrl ?? baseHref,
      lang,
      links,
      meta,
      title
    };
  }, [tdoc.context, baseUrl]);
  useEffect(() => {
    onDocumentMetadataLoaded?.call(null, metadata);
  }, [onDocumentMetadataLoaded, metadata]);
  return (
    <DocumentMetadataProvider value={metadata}>
      <TNodeChildrenRenderer tnode={tdoc} />
    </DocumentMetadataProvider>
  );
};

export default TDocumentRenderer;
