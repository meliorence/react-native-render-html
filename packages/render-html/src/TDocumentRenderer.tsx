import React from 'react';
import { TDocument } from '@native-html/transient-render-engine';
import { DocumentMetadata } from './shared-types';
import DocumentMetadataProvider from './context/DocumentMetadataProvider';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';

const TDocumentRenderer = ({
  tdoc,
  baseUrl
}: {
  tdoc: TDocument;
  baseUrl?: string;
}) => {
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const { baseHref, baseTarget, lang, links, meta, title } = tdoc.context;
  const metadata: DocumentMetadata = {
    baseTarget,
    baseUrl: baseUrl ?? baseHref,
    lang,
    links,
    meta,
    scheme: 'https',
    title
  };
  return (
    <DocumentMetadataProvider value={metadata}>
      <TNodeChildrenRenderer tnode={tdoc} hasAnchorAncestor={false} />
    </DocumentMetadataProvider>
  );
};

export default TDocumentRenderer;
